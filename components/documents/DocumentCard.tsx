"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MoreVertical,
  Eye,
  Sparkles,
  RefreshCw,
  Trash2,
  Copy,
  ExternalLink,
  Check,
} from "lucide-react";
import { DocumentItem } from "@/types/document";
import { formatBytes, formatDate } from "@/lib/utils";
import { FileTypeIcon } from "@/components/ui/FileTypeIcon";
import { useToast } from "@/components/ui/ToastNotification";

interface DocumentCardProps {
  document: DocumentItem;
  viewMode?: "grid" | "list";
  onDelete?: (id: string) => void;
}

export function DocumentCard({
  document,
  viewMode = "grid",
  onDelete,
}: DocumentCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const handleCopySummary = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(
      document.summary || `${document.name} - ${formatBytes(document.size)}`
    );
    setCopied(true);
    success("Copied to clipboard", "Document summary copied successfully.");
    setTimeout(() => setCopied(false), 2000);
    setMenuOpen(false);
  };

  // Pastel styling based on file type matching Figma style
  const getCardBg = () => {
    switch (document.fileType) {
      case "image":
        return "bg-gradient-to-b from-[#FAF5FF] to-white border-purple-100 hover:border-purple-300";
      case "pdf":
        return "bg-gradient-to-b from-[#F0F9FF] to-white border-sky-100 hover:border-sky-300";
      case "docx":
      case "doc":
        return "bg-gradient-to-b from-[#F5F3FF] to-white border-indigo-100 hover:border-indigo-300";
      case "xlsx":
      case "xls":
        return "bg-gradient-to-b from-[#F0FDF4] to-white border-emerald-100 hover:border-emerald-300";
      case "pptx":
      case "ppt":
        return "bg-gradient-to-b from-[#FFFBEB] to-white border-amber-100 hover:border-amber-300";
      default:
        return "bg-gradient-to-b from-slate-50 to-white border-slate-200 hover:border-slate-300";
    }
  };

  if (viewMode === "list") {
    return (
      <div className="relative group flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all">
        <Link
          href={`/documents/${document.id}`}
          className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
            <FileTypeIcon type={document.fileType} size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
              {document.name}
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
              <span>{formatBytes(document.size)}</span>
              <span>•</span>
              <span>{formatDate(document.updatedAt)}</span>
              {document.pageCount && (
                <>
                  <span>•</span>
                  <span>{document.pageCount} pages</span>
                </>
              )}
            </div>
          </div>
        </Link>

        {/* Status tag */}
        <div className="hidden sm:flex items-center gap-3 mr-4">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            Indexed
          </span>
          <Link
            href={`/workspace?doc=${document.id}`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition"
            title="Ask AI about this document"
          >
            <Sparkles className="w-4 h-4" />
          </Link>
        </div>

        {/* More Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-20 animate-in fade-in"
              onClick={() => setMenuOpen(false)}
            >
              <Link
                href={`/documents/${document.id}`}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                View Document
              </Link>
              <Link
                href={`/workspace?doc=${document.id}`}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Ask AI Workspace
              </Link>
              <Link
                href={`/convert?source=${document.id}`}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                Convert Format
              </Link>
              <button
                type="button"
                onClick={handleCopySummary}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 text-left"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                )}
                Copy Summary
              </button>
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(document.id)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 text-left border-t border-slate-100 mt-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete File
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Grid View Card
  return (
    <div
      className={`group relative flex flex-col justify-between p-5 rounded-3xl border shadow-xs hover:shadow-md transition-all duration-200 ${getCardBg()}`}
    >
      {/* Top Header of Card */}
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
          <FileTypeIcon type={document.fileType} size={24} />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/80 border border-slate-200/60 text-slate-600 shadow-2xs">
            {document.fileType}
          </span>
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/80 transition"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-20 animate-in fade-in"
                onClick={() => setMenuOpen(false)}
              >
                <Link
                  href={`/documents/${document.id}`}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  View Document
                </Link>
                <Link
                  href={`/workspace?doc=${document.id}`}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Ask AI Workspace
                </Link>
                <Link
                  href={`/convert?source=${document.id}`}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                  Convert Format
                </Link>
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 text-left"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  Copy Summary
                </button>
                {onDelete && (
                  <button
                    type="button"
                    onClick={() => onDelete(document.id)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 text-left border-t border-slate-100 mt-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete File
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Title & info */}
      <Link href={`/documents/${document.id}`} className="mt-4 block flex-1">
        <h3 className="font-bold text-sm sm:text-base text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {document.name}
        </h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
          {document.summary || "Ready for AI search, analysis, and instant OCR."}
        </p>
      </Link>

      {/* Card Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between text-xs text-slate-400">
        <span className="font-medium">{formatBytes(document.size)}</span>
        <div className="flex items-center gap-2">
          <span>{formatDate(document.updatedAt)}</span>
          <Link
            href={`/workspace?doc=${document.id}`}
            className="w-6 h-6 rounded-full bg-white shadow-xs flex items-center justify-center text-slate-400 hover:text-indigo-600 transition"
            title="Chat with AI"
          >
            <Sparkles className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
