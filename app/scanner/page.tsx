"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Camera,
  UploadCloud,
  RotateCw,
  Sliders,
  Copy,
  Download,
  Check,
  ScanText,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Layers,
  ArrowRight,
  Eye,
} from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopBar } from "@/components/layout/TopBar";
import { FloatingMobileNav } from "@/components/layout/FloatingMobileNav";
import { ToastProvider, useToast } from "@/components/ui/ToastNotification";

export function ScannerContent() {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    "/receipt-demo.png"
  );
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasScanned, setHasScanned] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { success, error, info } = useToast();

  const sampleOcrText = `NEW YORK GROCERY
144 W 23rd St, New York, NY 10011
Jan 21, 2024, 2:14 PM

ITEMS:
Bread          $3.25
Eggs           $5.50
Milk           $3.80
Apples         $4.25
Preserves      $3.50
Yeast Extract  $5.45

Subtotal       $25.75
Tax (8.875%)    $2.28
Tip/Other       $1.55
-----------------------
TOTAL          $29.58

Card: Visa ending 4082
Confidence Score: 98.4%`;

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
          setHasScanned(false);
          setRotation(0);
          success("Image Loaded", file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Start Camera
  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      info("Camera Activated", "Position the document within the frame.");
    } catch (err: any) {
      setCameraError(
        "Camera permission was denied or no camera device was found. You can still upload images from your device."
      );
      error("Camera Error", "Permission denied or unavailable.");
    }
  };

  const captureCameraFrame = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg");
      setSelectedImage(dataUrl);
      stopCamera();
      setHasScanned(false);
      success("Document Captured", "Ready for OCR text recognition.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  // Run OCR
  const handleRecognizeText = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setHasScanned(true);
      success("Text Recognized", "Extracted 6 line items with 98.4% accuracy.");
    }, 900);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(sampleOcrText);
    setIsCopied(true);
    success("Copied to clipboard", "OCR text copied.");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    const element = document.createElement("a");
    const file = new Blob([sampleOcrText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "scanned_receipt_ocr.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    success("Download Started", "Saved text representation.");
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 pb-28 md:pb-12">
        <TopBar
          title="Smart Scanner"
          subtitle="Scan documents, recognize text, and create clean PDFs."
        />

        <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Smart Scanner & OCR
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Capture physical documents and receipts directly through camera
                or upload.
              </p>
            </div>

            {/* Quick Upload / Camera Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
              >
                <UploadCloud className="w-4 h-4 text-purple-600" />
                <span>Upload Image</span>
              </button>

              <button
                type="button"
                onClick={cameraActive ? stopCamera : startCamera}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition shadow-xs ${
                  cameraActive
                    ? "bg-rose-600 text-white hover:bg-rose-700"
                    : "bg-slate-900 text-white hover:bg-black"
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>{cameraActive ? "Close Camera" : "Open Camera"}</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          </div>

          {cameraError && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>{cameraError}</span>
            </div>
          )}

          {/* Scanner Grid: Live Camera/Preview on Left, OCR on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Image Canvas & Image Controls */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Scanner Canvas
                </span>

                {/* Adjustments */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRotation((r) => (r + 90) % 360)}
                    className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition text-xs font-semibold flex items-center gap-1"
                    title="Rotate 90 degrees"
                  >
                    <RotateCw className="w-4 h-4" />
                    <span>Rotate</span>
                  </button>

                  <button
                    onClick={() => {
                      setBrightness(100);
                      setContrast(100);
                      setRotation(0);
                    }}
                    className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition text-xs font-semibold"
                    title="Reset adjustments"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Viewport */}
              <div className="relative min-h-[380px] bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800">
                {cameraActive ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full max-h-[400px] object-cover"
                    />
                    <div className="absolute inset-8 border-2 border-dashed border-sky-400/70 rounded-2xl pointer-events-none flex items-center justify-center">
                      <span className="bg-black/60 text-white text-[11px] px-3 py-1 rounded-full backdrop-blur-xs">
                        Align document within border
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={captureCameraFrame}
                      className="absolute bottom-4 px-6 py-3 bg-white text-slate-900 rounded-full font-bold text-xs shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
                    >
                      <Camera className="w-4 h-4 text-sky-600" />
                      Capture Photo
                    </button>
                  </div>
                ) : (
                  <div className="p-8 flex items-center justify-center w-full h-full">
                    {/* Rendered receipt canvas */}
                    <div
                      style={{
                        transform: `rotate(${rotation}deg)`,
                        filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                      }}
                      className="w-full max-w-xs bg-white rounded-2xl shadow-2xl p-6 font-mono text-slate-900 text-xs transition-all duration-200"
                    >
                      <div className="text-center border-b pb-2 mb-3">
                        <p className="font-bold text-sm font-sans">
                          NEW YORK GROCERY
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Jan 21, 2024, 2:14 PM
                        </p>
                      </div>
                      <div className="space-y-1.5 text-[11px]">
                        <div className="flex justify-between">
                          <span>Bread</span>
                          <span>$3.25</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Eggs</span>
                          <span>$5.50</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Milk</span>
                          <span>$3.80</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Apples</span>
                          <span>$4.25</span>
                        </div>
                        <div className="flex justify-between font-bold pt-2 border-t">
                          <span>TOTAL</span>
                          <span>$29.58</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sliders for Brightness & Contrast */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Brightness</span>
                    <span>{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Contrast (Enhance text)</span>
                    <span>{contrast}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="180"
                    value={contrast}
                    onChange={(e) => setContrast(Number(e.target.value))}
                    className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleRecognizeText}
                  disabled={isProcessing}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <ScanText className="w-4 h-4" />
                  <span>{isProcessing ? "Processing OCR..." : "Recognize Text (OCR)"}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Extracted Text & Export Options */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Extracted Text & Metadata
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Confidence 98.4%
                  </span>
                </div>

                <div className="mt-4">
                  <pre className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed max-h-[340px] overflow-y-auto">
                    {sampleOcrText}
                  </pre>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="flex-1 py-3 px-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span>Copy Text</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    className="flex-1 py-3 px-4 rounded-2xl bg-slate-900 hover:bg-black text-xs font-bold text-white flex items-center justify-center gap-2 transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>

                <Link
                  href="/workspace?doc=doc-receipt-01"
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 text-indigo-900 text-xs font-bold flex items-center justify-center gap-2 hover:bg-indigo-100 transition"
                >
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Send to AI Workspace for Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>

      <FloatingMobileNav />
    </div>
  );
}

export default function ScannerPage() {
  return (
    <ToastProvider>
      <ScannerContent />
    </ToastProvider>
  );
}
