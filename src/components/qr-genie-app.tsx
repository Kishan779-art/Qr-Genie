"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import QRCode from "qrcode";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { QrCode, Download, History, Trash2, RefreshCw, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  text: z.string().min(1, "Please enter a valid URL or text."),
  size: z.coerce.number().default(250),
  fgColor: z.string().default("#FFFFFF"),
});

type FormValues = z.infer<typeof formSchema>;
type HistoryItem = FormValues & { timestamp: string };

function HistoryItemDisplay({ 
  item, 
  onRegenerate,
  onDownload
}: { 
  item: HistoryItem, 
  onRegenerate: (item: HistoryItem) => void,
  onDownload: (item: HistoryItem) => void 
}) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const generateQr = async () => {
      try {
        const url = await QRCode.toDataURL(item.text, {
          width: 128,
          color: { dark: item.fgColor, light: "#00000000" },
          margin: 1
        });
        setQrCodeUrl(url);
      } catch (error) {
        console.error("Failed to generate history QR code", error);
      }
    };
    generateQr();
  }, [item]);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10 transition-all duration-300 hover:bg-white/10 hover:shadow-cyan-500/10 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
        {qrCodeUrl ? (
          <img src={qrCodeUrl} alt="QR Code" className="h-24 w-24 rounded-lg shrink-0 border-2 border-white/10 bg-black/20 p-1"/>
        ) : (
          <div className="h-24 w-24 rounded-lg shrink-0 border-2 border-white/10 bg-black/20 p-1 flex items-center justify-center">
            <QrCode className="h-10 w-10 text-muted-foreground" />
          </div>
        )}
        <div className="flex-grow truncate text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <p className="font-medium truncate flex-1">{item.text}</p>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy}>
              {isCopied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
              <span className="sr-only">Copy Text</span>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {format(new Date(item.timestamp), "PPp")} &bull; {item.size}px
          </p>
           <div className="flex gap-2 mt-3 justify-center sm:justify-start">
            <Button variant="outline" size="sm" onClick={() => onRegenerate(item)} className="bg-transparent border-white/20 hover:bg-white/10">
              <RefreshCw className="h-3 w-3 sm:mr-2"/>
              <span className="hidden sm:inline">Regenerate</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDownload(item)} className="bg-transparent border-white/20 hover:bg-white/10">
              <Download className="h-3 w-3 sm:mr-2" />
               <span className="hidden sm:inline">Download</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function QRGenieApp() {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pulse, setPulse] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      size: 250,
      fgColor: "#FFFFFF",
    },
  });

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem("qrHistory");
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to parse history from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("qrHistory", JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save history to localStorage", error);
    }
  }, [history]);

  const generateQrCode = async (data: FormValues) => {
    if (!canvasRef.current) return { success: false, dataUrl: '' };
    try {
      await QRCode.toCanvas(canvasRef.current, data.text, {
        width: data.size,
        color: {
          dark: data.fgColor,
          light: "#00000000",
        },
        margin: 2,
      });
      const dataUrl = canvasRef.current.toDataURL("image/png");
      setQrDataUrl(dataUrl);
      return { success: true, dataUrl };
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate QR code. The text might be too long for the selected size.",
      });
      return { success: false, dataUrl: '' };
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsGenerating(true);
    setPulse(true);
    const { success, dataUrl } = await generateQrCode(data);
    if (success) {
      const newHistoryItem: HistoryItem = {
        ...data,
        timestamp: new Date().toISOString(),
      };
      setHistory((prevHistory) => [newHistoryItem, ...prevHistory].slice(0, 5));
    }
    setTimeout(() => setPulse(false), 500);
    setIsGenerating(false);
  };
  
  const handleRegenerate = async (item: HistoryItem) => {
    form.reset(item);
    await generateQrCode(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleDownload = (item?: HistoryItem) => {
    const dataToUse = item || form.getValues();
    const dataUrlToUse = item ? undefined : qrDataUrl;
  
    if (!dataUrlToUse && !item) {
      toast({
        variant: "destructive",
        title: "No QR Code",
        description: "Please generate a QR code first.",
      });
      return;
    }

    const download = (url: string) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = `qr-genie-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    if (dataUrlToUse) {
      download(dataUrlToUse);
    } else if (item) {
      const canvas = document.createElement('canvas');
      QRCode.toCanvas(canvas, dataToUse.text, {
        width: dataToUse.size,
        color: {
          dark: dataToUse.fgColor,
          light: "#FFFFFF", // Use solid background for download
        },
        margin: 2,
      }, (error) => {
        if (error) {
           toast({ variant: "destructive", title: "Download Error", description: "Failed to create QR code for download." });
        } else {
          download(canvas.toDataURL("image/png"));
        }
      });
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto p-4 md:p-8">
      <Card className="lg:col-span-2 bg-black/20 backdrop-blur-sm border-white/10 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Create Your QR Code</CardTitle>
          <CardDescription>Enter your text or URL and customize the design.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="text">URL or Text</Label>
              <Input
                id="text"
                placeholder="e.g., https://example.com"
                className="bg-white/5 border-white/20 focus:ring-cyan-500"
                {...form.register("text")}
              />
              {form.formState.errors.text && (
                <p className="text-sm text-destructive">{form.formState.errors.text.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                 <Select
                  onValueChange={(value) => form.setValue("size", parseInt(value))}
                  defaultValue={String(form.getValues("size"))}
                >
                  <SelectTrigger id="size" className="bg-white/5 border-white/20 focus:ring-cyan-500">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800/80 backdrop-blur-sm border-white/20">
                    <SelectItem value="150">Small</SelectItem>
                    <SelectItem value="250">Medium</SelectItem>
                    <SelectItem value="350">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fgColor">Color</Label>
                <div className="flex items-center gap-2">
                   <Input
                    id="fgColor"
                    type="color"
                    className="p-1 h-10 w-14 cursor-pointer bg-white/5 border-white/20"
                    {...form.register("fgColor")}
                  />
                   <Input
                    className="flex-1 bg-white/5 border-white/20 focus:ring-cyan-500"
                    value={form.watch('fgColor')}
                    onChange={(e) => form.setValue('fgColor', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className={cn("w-full text-lg py-6 btn-gradient transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 active:scale-100", pulse && "animate-pulse-once")} disabled={isGenerating}>
              {isGenerating ? 'Generating...' : 'Generate QR Code'}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-8">
        <Card className="sticky top-8 bg-black/20 backdrop-blur-sm border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <div className="w-full aspect-square transition-all duration-300 bg-black/20 rounded-lg flex items-center justify-center p-4 border-2 border-dashed border-white/10">
              {qrDataUrl ? (
                  <img src={qrDataUrl} alt="Generated QR Code" className="rounded-lg shadow-lg" style={{width: '100%', height: '100%'}}/>
              ) : (
                  <div className="text-center text-muted-foreground">
                      <QrCode className="mx-auto h-16 w-16 mb-2" />
                      Your QR code will appear here.
                  </div>
              )}
            </div>
             <canvas ref={canvasRef} className="hidden"></canvas>
          </CardContent>
          {qrDataUrl && (
            <div className="p-6 pt-2">
                 <Button onClick={() => handleDownload()} className="w-full btn-gradient transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
                    <Download className="mr-2 h-4 w-4" />
                    Download PNG
                </Button>
            </div>
          )}
        </Card>
      </div>

      <Card className="lg:col-span-3 bg-black/20 backdrop-blur-sm border-white/10 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="font-headline text-3xl">History</CardTitle>
            <CardDescription>Your last 5 generated codes.</CardDescription>
          </div>
          {history.length > 0 && (
            <Button variant="ghost" size="icon" onClick={clearHistory} className="hover:bg-white/10 hover:text-red-400">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Clear History</span>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {history.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {history.map((item, index) => (
                 <HistoryItemDisplay key={index} item={item} onRegenerate={handleRegenerate} onDownload={handleDownload} />
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-10 border-2 border-dashed border-white/10 rounded-lg">
              <History className="mx-auto h-12 w-12 mb-2" />
              <p>No history yet. Generate a QR code to see it here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
