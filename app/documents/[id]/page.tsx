"use client";

import React, { useState, use, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  Share2,
  Copy,
  Sparkles,
  FileText,
  Eye,
  Check,
  Send,
  Bold,
  Italic,
  List,
  ListOrdered,
  Type,
  FileSpreadsheet,
  Receipt,
  ScanText,
  EyeOff,
} from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { FloatingMobileNav } from "@/components/layout/FloatingMobileNav";
import { FileTypeIcon } from "@/components/ui/FileTypeIcon";
import { ToastProvider, useToast } from "@/components/ui/ToastNotification";
import { MOCK_DOCUMENTS } from "@/lib/mock-data";
import { formatBytes, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

function ViewerContent({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { success, info } = useToast();

  const currentDoc =
    MOCK_DOCUMENTS.find((d) => d.id === resolvedParams.id) || MOCK_DOCUMENTS[0];

  const [activeTab, setActiveTab] = useState<"ai" | "ocr" | "meta">("ai");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCopied, setIsCopied] = useState(false);
  const [isRecognized, setIsRecognized] = useState(true);
  const [aiQuery, setAiQuery] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([
    {
      role: "assistant",
      text: `Hello! I have analyzed "${currentDoc.name}". Ask me anything about its contents, totals, dates, or summaries.`,
    },
  ]);

  const handleCopyText = () => {
    navigator.clipboard.writeText(currentDoc.extractedText || currentDoc.summary || "");
    setIsCopied(true);
    success("Text Copied", "Extracted content copied to clipboard.");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;
    const userMsg = promptText;
    setChatMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setAiQuery("");

    // Smart contextual response based on document
    setTimeout(() => {
      let reply = `Based on "${currentDoc.name}": `;
      const lower = userMsg.toLowerCase();

      if (lower.includes("total") || lower.includes("cost") || lower.includes("amount")) {
        reply += currentDoc.id === "doc-receipt-01"
          ? "The receipt grand total is $29.58 (Subtotal: $25.75, Tax: $2.28)."
          : "Total reported figure is $48.2M ARR (+34% YoY).";
      } else if (lower.includes("summar") || lower.includes("about")) {
        reply += currentDoc.summary || "Document details verified.";
      } else if (lower.includes("date") || lower.includes("when")) {
        reply += `The file is dated ${formatDate(currentDoc.updatedAt)}.`;
      } else {
        reply += `Analysis completed. Key highlights include: ${currentDoc.summary?.slice(0, 120)}...`;
      }

      setChatMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    }, 600);
  };

  const handleSimulatedDownload = () => {
    // Generate text blob for download
    const blob = new Blob(
      [currentDoc.extractedText || currentDoc.summary || "Universal Document Hub Export"],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentDoc.name.replace(/\.[^/.]+$/, "")}-export.txt`;
    a.click();
    URL.revokeObjectURL(url);
    success("Download Started", `Exported "${currentDoc.name}" representation.`);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top bar for viewer */}
        <header className="h-16 px-4 sm:px-6 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            <Link
              href="/documents"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
              title="Back to Documents"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <FileTypeIcon type={currentDoc.fileType} size={18} />
              </div>
              <div>
                <h1 className="text-sm font-bold text-slate-900 line-clamp-1 max-w-[200px] sm:max-w-md">
                  {currentDoc.name}
                </h1>
                <p className="text-[11px] text-slate-400">
                  {formatBytes(currentDoc.size)} • {formatDate(currentDoc.updatedAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Right action controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition text-xs font-semibold flex items-center gap-1.5"
              title="Copy Extracted Content"
            >
              {isCopied ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">Copy Text</span>
            </button>

            <button
              onClick={handleSimulatedDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-black transition shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </header>

        {/* 3-Column Viewer Workspace */}
        <div className="flex-1 flex overflow-hidden">
          {/* LEFT PANEL: Document Thumbnails & Metadata */}
          <div className="hidden lg:flex flex-col w-64 border-r border-slate-200 bg-white p-4 overflow-y-auto space-y-4 shrink-0">
            <div>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Workspace Documents
              </h2>
              <div className="space-y-1">
                {MOCK_DOCUMENTS.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/documents/${doc.id}`}
                    className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold transition ${
                      doc.id === currentDoc.id
                        ? "bg-slate-900 text-white shadow-2xs"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <FileTypeIcon
                      type={doc.fileType}
                      className={doc.id === currentDoc.id ? "text-white" : "text-slate-500"}
                      size={16}
                    />
                    <span className="truncate">{doc.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Document Details
              </h2>
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Format:</span>
                  <span className="font-bold uppercase text-slate-800">
                    {currentDoc.fileType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">File Size:</span>
                  <span className="font-semibold text-slate-800">
                    {formatBytes(currentDoc.size)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pages:</span>
                  <span className="font-semibold text-slate-800">
                    {currentDoc.pageCount || 1}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">OCR Status:</span>
                  <span className="font-bold text-emerald-600">
                    100% Extracted
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Category:</span>
                  <span className="font-semibold text-slate-800">
                    {currentDoc.category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER PANEL: Document Preview Canvas */}
          <div className="flex-1 flex flex-col bg-[#ECEFF2] overflow-hidden">
            {/* Action pill row matching Figma Screen 4 */}
            <div className="bg-white/95 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                {/* Recognize text (Cyan) */}
                <button
                  type="button"
                  onClick={() => {
                    setIsRecognized(true);
                    info("OCR Text Recognized", "Text blocks mapped to layout.");
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0284C7] transition"
                >
                  <ScanText className="w-3.5 h-3.5" />
                  <span>Recognize text</span>
                </button>

                {/* Copy text (Lavender) */}
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#F3E8FF] hover:bg-[#E9D5FF] text-[#9333EA] transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy text</span>
                </button>

                {/* Share (Mint) */}
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    success("Link Copied", "Shareable document link copied.");
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#DCFCE7] hover:bg-[#BBF7D0] text-[#16A34A] transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>

                {/* Hide / Toggle View (Peach) */}
                <button
                  type="button"
                  onClick={() => setIsRecognized(!isRecognized)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#FFE4E6] hover:bg-[#FECDD3] text-[#E11D48] transition"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>{isRecognized ? "Hide OCR" : "Show OCR"}</span>
                </button>
              </div>

              {/* Formatting Toolbar matching Screen 4 (B, I, Aa, Ad, bullet, list) */}
              <div className="hidden sm:flex items-center gap-1 bg-slate-100 rounded-xl p-1 text-slate-600">
                <button
                  className="p-1 hover:bg-white rounded-lg transition"
                  title="Bold"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  className="p-1 hover:bg-white rounded-lg transition"
                  title="Italic"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  className="p-1 hover:bg-white rounded-lg transition"
                  title="Font size"
                >
                  <Type className="w-3.5 h-3.5" />
                </button>
                <button
                  className="p-1 hover:bg-white rounded-lg transition"
                  title="Bulleted list"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  className="p-1 hover:bg-white rounded-lg transition"
                  title="Numbered list"
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Zoom controls */}
              <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(z - 15, 60))}
                  className="p-1 hover:bg-white rounded-lg text-slate-600 transition"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-bold text-slate-700 w-10 text-center">
                  {zoomLevel}%
                </span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(z + 15, 180))}
                  className="p-1 hover:bg-white rounded-lg text-slate-600 transition"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Document Render Canvas */}
            <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start">
              {/* Receipt Preview (Figma Screen 4 exact replica) */}
              {currentDoc.id === "doc-receipt-01" ? (
                <div
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
                  className="w-full max-w-sm bg-white rounded-3xl shadow-xl border border-slate-200/90 p-8 font-mono text-slate-800 transition-transform duration-150 space-y-4"
                >
                  <div className="text-center border-b border-dashed border-slate-200 pb-4">
                    <h2 className="text-xl font-bold font-sans text-slate-900 tracking-tight">
                      New York Grocery
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      144 W 23rd St, New York, NY 10011
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Jan 21, 2024, 2:14 PM
                    </p>
                  </div>

                  {/* Items */}
                  <div className="text-xs space-y-2 py-2">
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
                    <div className="flex justify-between">
                      <span>Preserves</span>
                      <span>$3.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Yeast Extract</span>
                      <span>$5.45</span>
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="border-t border-dashed border-slate-200 pt-3 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal</span>
                      <span>$25.75</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Tax (8.875%)</span>
                      <span>$2.28</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Tip / Other</span>
                      <span>$1.55</span>
                    </div>
                    <div className="flex justify-between font-bold text-base text-slate-900 pt-2 border-t border-slate-200">
                      <span>Total</span>
                      <span>$29.58</span>
                    </div>
                  </div>

                  {/* Receipt Footer */}
                  <div className="text-center pt-4 text-[11px] text-slate-400">
                    <p>Card: Visa ending 4082</p>
                    <p className="mt-1">Thank you for shopping with us!</p>
                  </div>
                </div>
              ) : currentDoc.fileType === "xlsx" ? (
                /* Spreadsheet Preview */
                <div
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
                  className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-slate-200/90 p-6 transition-transform duration-150 space-y-4"
                >
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                      <h2 className="text-base font-bold text-slate-900">
                        {currentDoc.name}
                      </h2>
                    </div>
                    <span className="text-xs text-slate-400">Sheet 1: Actuals</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 font-bold border-b">
                          <th className="p-2.5">Region</th>
                          <th className="p-2.5">Q1 Actual</th>
                          <th className="p-2.5">Q2 Actual</th>
                          <th className="p-2.5">Q3 Actual</th>
                          <th className="p-2.5">Q4 Target</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr>
                          <td className="p-2.5 font-semibold">North America</td>
                          <td className="p-2.5">$4,200,000</td>
                          <td className="p-2.5">$4,800,000</td>
                          <td className="p-2.5 text-emerald-600 font-bold">$5,400,000</td>
                          <td className="p-2.5 font-medium">$6,100,000</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-semibold">EMEA</td>
                          <td className="p-2.5">$2,900,000</td>
                          <td className="p-2.5">$3,250,000</td>
                          <td className="p-2.5 text-emerald-600 font-bold">$3,700,000</td>
                          <td className="p-2.5 font-medium">$4,150,000</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-semibold">APAC</td>
                          <td className="p-2.5">$1,400,000</td>
                          <td className="p-2.5">$1,850,000</td>
                          <td className="p-2.5 text-emerald-600 font-bold">$2,300,000</td>
                          <td className="p-2.5 font-medium">$2,800,000</td>
                        </tr>
                        <tr className="bg-slate-50 font-bold text-slate-900">
                          <td className="p-2.5">Total</td>
                          <td className="p-2.5">$9,150,000</td>
                          <td className="p-2.5">$10,620,000</td>
                          <td className="p-2.5 text-emerald-700">$12,290,000</td>
                          <td className="p-2.5">$14,100,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* Standard PDF / Document Page Preview */
                <div
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
                  className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-200/90 p-8 sm:p-12 transition-transform duration-150 space-y-6"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      DOCUMENT PREVIEW • PAGE {currentPage} OF {currentDoc.pageCount || 1}
                    </span>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                      Verified Layout
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {currentDoc.name}
                    </h2>
                    <p className="text-xs font-semibold text-slate-400">
                      Category: {currentDoc.category} • Last updated {formatDate(currentDoc.updatedAt)}
                    </p>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-line">
                      {currentDoc.extractedText}
                    </div>

                    <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs text-sky-950 space-y-1">
                      <p className="font-bold flex items-center gap-1.5 text-sky-900">
                        <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                        AI Executive Summary
                      </p>
                      <p className="text-slate-600">{currentDoc.summary}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom page stepper */}
            <div className="h-12 bg-white border-t border-slate-200 px-4 flex items-center justify-between text-xs text-slate-500 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span>
                  Page {currentPage} of {currentDoc.pageCount || 1}
                </span>
                <button
                  disabled={currentPage >= (currentDoc.pageCount || 1)}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] text-slate-400">
                Simulated frontend document renderer
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: AI Document Assistant & Extracted Text */}
          <div className="hidden md:flex flex-col w-80 lg:w-96 border-l border-slate-200 bg-white shrink-0 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 text-xs font-bold text-slate-500">
              <button
                onClick={() => setActiveTab("ai")}
                className={`flex-1 py-3.5 border-b-2 text-center transition ${
                  activeTab === "ai"
                    ? "border-indigo-600 text-indigo-600 bg-indigo-50/30"
                    : "border-transparent hover:text-slate-900"
                }`}
              >
                AI Assistant
              </button>
              <button
                onClick={() => setActiveTab("ocr")}
                className={`flex-1 py-3.5 border-b-2 text-center transition ${
                  activeTab === "ocr"
                    ? "border-indigo-600 text-indigo-600 bg-indigo-50/30"
                    : "border-transparent hover:text-slate-900"
                }`}
              >
                Extracted Text
              </button>
            </div>

            {/* AI Assistant Chat Tab */}
            {activeTab === "ai" && (
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Chat message history */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-2 ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                          AI
                        </div>
                      )}
                      <div
                        className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                          msg.role === "user"
                            ? "bg-slate-900 text-white rounded-tr-xs"
                            : "bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-xs shadow-2xs"
                        }`}
                      >
                        {msg.text}
                      </div>
                      {msg.role === "user" && (
                        <div className="w-6 h-6 rounded-full bg-slate-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                          P
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Suggested question chips */}
                <div className="p-3 bg-slate-50 border-t border-slate-100 space-y-1.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Suggested Questions
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => handleSendPrompt("Summarize this document")}
                      className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition"
                    >
                      Summarize
                    </button>
                    <button
                      onClick={() => handleSendPrompt("What are the key totals?")}
                      className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition"
                    >
                      Extract Totals
                    </button>
                    <button
                      onClick={() => handleSendPrompt("What are the action items?")}
                      className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition"
                    >
                      Action items
                    </button>
                  </div>
                </div>

                {/* Input box */}
                <div className="p-3 border-t border-slate-200 bg-white">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendPrompt(aiQuery);
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      placeholder="Ask about this document..."
                      className="flex-1 bg-slate-100 text-xs px-3.5 py-2.5 rounded-full border border-slate-200 outline-none focus:border-indigo-500 focus:bg-white transition"
                    />
                    <button
                      type="submit"
                      className="p-2.5 rounded-full bg-slate-900 text-white hover:bg-black transition shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* OCR Extracted Text Tab */}
            {activeTab === "ocr" && (
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">Raw OCR Content</span>
                  <button
                    onClick={handleCopyText}
                    className="text-[11px] font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                </div>
                <pre className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-slate-800 font-mono text-[11px] whitespace-pre-wrap leading-relaxed">
                  {currentDoc.extractedText}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      <FloatingMobileNav />
    </div>
  );
}

export default function DocumentViewerPage({ params }: PageProps) {
  return (
    <ToastProvider>
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-8 text-xs text-slate-500 font-semibold gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-slate-300 border-t-indigo-600 animate-spin" />
            <span>Loading Document Viewer...</span>
          </div>
        }
      >
        <ViewerContent params={params} />
      </Suspense>
    </ToastProvider>
  );
}
