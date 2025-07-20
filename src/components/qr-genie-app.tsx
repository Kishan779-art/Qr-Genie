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
import { QrCode, Download, History, Trash2, RefreshCw } from "lucide-react";

const formSchema = z.object({
  text: z.string().min(1, "Please enter a valid URL or text."),
  size: z.coerce.number().default(250),
  fgColor: z.string().default("#FFFFFF"),
});

type FormValues = z.infer<typeof formSchema>;
type HistoryItem = FormValues & { timestamp: string };

export default function QRGenieApp() {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

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
    if (!canvasRef.current) return;
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
      return true;
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate QR code. The text might be too long for the selected size.",
      });
      return false;
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const success = await generateQrCode(data);
    if (success) {
      const newHistoryItem: HistoryItem = {
        ...data,
        timestamp: new Date().toISOString(),
      };
      setHistory((prevHistory) => [newHistoryItem, ...prevHistory].slice(0, 5));
    }
  };
  
  const handleRegenerate = async (item: HistoryItem) => {
    form.reset(item);
    await generateQrCode(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleDownload = () => {
    if (!qrDataUrl) {
      toast({
        variant: "destructive",
        title: "No QR Code",
        description: "Please generate a QR code first.",
      });
      return;
    }
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `qr-code-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="font-headline">Create Your QR Code</CardTitle>
          <CardDescription>Enter your text or URL and customize the design.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="text">URL or Text</Label>
              <Input
                id="text"
                placeholder="e.g., https://example.com"
                {...form.register("text")}
              />
              {form.formState.errors.text && (
                <p className="text-sm text-red-500">{form.formState.errors.text.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                 <Select
                  onValueChange={(value) => form.setValue("size", parseInt(value))}
                  defaultValue={String(form.getValues("size"))}
                >
                  <SelectTrigger id="size">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="150">Small (150x150)</SelectItem>
                    <SelectItem value="250">Medium (250x250)</SelectItem>
                    <SelectItem value="350">Large (350x350)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fgColor">Foreground Color</Label>
                <div className="flex items-center gap-2">
                   <Input
                    id="fgColor"
                    type="color"
                    className="p-1 h-10 w-14 cursor-pointer"
                    {...form.register("fgColor")}
                  />
                   <Input
                    className="flex-1"
                    value={form.watch('fgColor')}
                    onChange={(e) => form.setValue('fgColor', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full text-lg py-6" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Generating...' : 'Generate QR Code'}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-8">
        <Card className="sticky top-8">
          <CardHeader>
            <CardTitle className="font-headline">Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center min-h-[250px] aspect-square transition-all duration-300">
            {qrDataUrl ? (
                <img src={qrDataUrl} alt="Generated QR Code" className="rounded-lg shadow-lg" style={{width: form.watch('size'), height: form.watch('size')}}/>
            ) : (
                <div className="text-center text-muted-foreground p-4 border-2 border-dashed border-border rounded-lg">
                    <QrCode className="mx-auto h-16 w-16 mb-2" />
                    Your QR code will appear here.
                </div>
            )}
             <canvas ref={canvasRef} className="hidden"></canvas>
          </CardContent>
          {qrDataUrl && (
            <div className="p-6 pt-0">
                 <Button onClick={handleDownload} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Download className="mr-2 h-4 w-4" />
                    Download PNG
                </Button>
            </div>
          )}
        </Card>
      </div>

      <Card className="lg:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="font-headline">History</CardTitle>
            <CardDescription>Your last 5 generated codes.</CardDescription>
          </div>
          {history.length > 0 && (
            <Button variant="ghost" size="icon" onClick={clearHistory}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Clear History</span>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {history.length > 0 ? (
            <ul className="space-y-4">
              {history.map((item, index) => (
                <li key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg bg-secondary/50 gap-4">
                  <div className="flex items-center gap-4 truncate w-full sm:w-auto">
                    <div style={{ backgroundColor: item.fgColor }} className="h-10 w-10 rounded-md shrink-0 border"/>
                    <div className="truncate">
                      <p className="font-medium truncate">{item.text}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(item.timestamp), "PPpp")} &bull; {item.size}px
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleRegenerate(item)} className="w-full sm:w-auto">
                    <RefreshCw className="h-4 w-4 sm:mr-2"/>
                    <span className="hidden sm:inline">Regenerate</span>
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-muted-foreground py-10">
              <History className="mx-auto h-12 w-12 mb-2" />
              <p>No history yet. Generate a QR code to see it here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
