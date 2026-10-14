"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  RefreshCw,
  ArrowRight,
  FileText,
  Download,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileSpreadsheet,
  Image as ImageIcon,
  Sparkles,
  Zap,
} from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopBar } from "@/components/layout/TopBar";
import { FloatingMobileNav } from "@/components/layout/FloatingMobileNav";
import { ToastProvider, useToast } from "@/components/ui/ToastNotification";
import { MOCK_DOCUMENTS } from "@/lib/mock-data";
import { FileTypeIcon } from "@/components/ui/FileTypeIcon";

export function ConvertContent() {
  const [documents] = useState(MOCK_DOCUMENTS);
  const [selectedDocId, setSelectedDocId] = useState(documents[0].id);
  const [outputFormat, setOutputFormat] = useState<string>("pdf");
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedResult, setConvertedResult] = useState<{
    fileName: string;
    size: string;
    downloadUrl: string;
  } | null>(null);

  const { success, error } = useToast();

  const selectedDoc = documents.find((d) => d.id === selectedDocId) || documents[0];

  const handleStartConversion = () => {
    // Check if coming soon
    if (outputFormat === "docx-server") {
      error("Cloud Feature", "DOCX server conversion is coming soon in Phase 2 with FastAPI.");
      return;
    }

    setConverting(true);
    setProgress(10);
    setConvertedResult(null);

    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(timer);
          return 90;
        }
        return p + 20;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(timer);
      setProgress(100);

      // Create downloadable blob
      const content = `UNIVERSAL DOCUMENT HUB CONVERTED FILE
Source: ${selectedDoc.name}
Output Format: ${outputFormat.toUpperCase()}
Converted at: ${new Date().toLocaleString()}

Extracted Content:
${selectedDoc.extractedText || selectedDoc.summary || "Converted document representation."}`;

      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const baseName = selectedDoc.name.replace(/\.[^/.]+$/, "");
      const newFileName = `${baseName}.${outputFormat}`;

      setConvertedResult({
        fileName: newFileName,
        size: "18.4 KB",
        downloadUrl: url,
      });

      setConverting(false);
      success("Conversion Complete", `Generated "${newFileName}".`);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 pb-28 md:pb-12">
        <TopBar
          title="Convert & Optimize"
          subtitle="Convert file formats, compress documents, and organize files."
        />

        <main className="flex-1 p-4 sm:p-8 max-w-5xl mx-auto w-full space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              File Format Converter & Optimizer
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Transform receipts, notes, and documents between formats with zero data leakage.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-8">
            {/* Conversion Pipeline Visualizer */}
            <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
              {/* Source Document Selection */}
              <div className="md:col-span-5 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Source File
                </span>
                <select
                  value={selectedDocId}
                  onChange={(e) => {
                    setSelectedDocId(e.target.value);
                    setConvertedResult(null);
                  }}
                  className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 outline-none hover:border-slate-300"
                >
                  {documents.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.fileType.toUpperCase()})
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                    <FileTypeIcon type={selectedDoc.fileType} size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      {selectedDoc.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Detected Format: {selectedDoc.fileType.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="md:col-span-1 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              {/* Target Format Selection */}
              <div className="md:col-span-5 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Desired Output Format
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOutputFormat("pdf")}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition ${
                      outputFormat === "pdf"
                        ? "bg-sky-50 border-sky-300 text-sky-900 ring-2 ring-sky-100"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100/50"
                    }`}
                  >
                    <span className="block font-bold">PDF Document</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      Standard Print & Share
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOutputFormat("txt")}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition ${
                      outputFormat === "txt"
                        ? "bg-purple-50 border-purple-300 text-purple-900 ring-2 ring-purple-100"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100/50"
                    }`}
                  >
                    <span className="block font-bold">Plain Text (.txt)</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      OCR Text Extraction
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOutputFormat("csv")}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition ${
                      outputFormat === "csv"
                        ? "bg-emerald-50 border-emerald-300 text-emerald-900 ring-2 ring-emerald-100"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100/50"
                    }`}
                  >
                    <span className="block font-bold">CSV Spreadsheet</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      Table Values Export
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOutputFormat("docx-server")}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition ${
                      outputFormat === "docx-server"
                        ? "bg-slate-100 border-slate-300 text-slate-900"
                        : "bg-white border-slate-200 text-slate-700 opacity-80"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">DOCX Cloud</span>
                      <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-semibold">
                        Coming soon
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-normal">
                      FastAPI Server Stage
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Conversion Trigger and Progress */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                Processed locally in browser memory. Zero external server uploads.
              </div>

              <button
                type="button"
                onClick={handleStartConversion}
                disabled={converting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {converting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
                    <span>Converting {progress}%...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Start Conversion</span>
                  </>
                )}
              </button>
            </div>

            {/* Converted Result Card */}
            {convertedResult && (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 animate-in fade-in flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-emerald-950">
                      Conversion Successful!
                    </h3>
                    <p className="text-xs text-emerald-700">
                      File generated: <strong>{convertedResult.fileName}</strong> ({convertedResult.size})
                    </p>
                  </div>
                </div>

                <a
                  href={convertedResult.downloadUrl}
                  download={convertedResult.fileName}
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download File</span>
                </a>
              </div>
            )}
          </div>
        </main>
      </div>

      <FloatingMobileNav />
    </div>
  );
}

export default function ConvertPage() {
  return (
    <ToastProvider>
      <ConvertContent />
    </ToastProvider>
  );
}
