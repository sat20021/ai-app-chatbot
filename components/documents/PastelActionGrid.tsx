"use client";

import React from "react";
import Link from "next/link";
import {
  Camera,
  Image as ImageIcon,
  FileText,
  FileSpreadsheet,
  Presentation,
  FilePlus,
  Sparkles,
} from "lucide-react";

interface PastelActionGridProps {
  onUploadClick?: (filterType?: string) => void;
  onBlankDocClick?: () => void;
}

export function PastelActionGrid({
  onUploadClick,
  onBlankDocClick,
}: PastelActionGridProps) {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Select document creation
        </h2>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          AI Enabled
        </span>
      </div>

      {/* Grid matching Figma screen 1 */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Scan Document */}
        <Link
          href="/scanner"
          className="group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-3xl bg-[#E0F2FE] hover:bg-[#BAE6FD] text-slate-800 transition-all duration-200 border border-[#BAE6FD]/60 shadow-xs hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#0284C7] mb-2.5 group-hover:scale-105 transition-transform">
            <Camera className="w-6 h-6 stroke-[2]" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-tight text-slate-800 text-center">
            Scan document
          </span>
        </Link>

        {/* Upload Photo */}
        <button
          type="button"
          onClick={() => onUploadClick?.("image")}
          className="group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-3xl bg-[#F3E8FF] hover:bg-[#E9D5FF] text-slate-800 transition-all duration-200 border border-[#E9D5FF]/60 shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#9333EA] mb-2.5 group-hover:scale-105 transition-transform">
            <ImageIcon className="w-6 h-6 stroke-[2]" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-tight text-slate-800 text-center">
            Upload photo
          </span>
        </button>

        {/* PDF */}
        <button
          type="button"
          onClick={() => onUploadClick?.("pdf")}
          className="group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-3xl bg-[#E0F2FE] hover:bg-[#BAE6FD] text-slate-800 transition-all duration-200 border border-[#BAE6FD]/60 shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#0369A1] mb-2.5 group-hover:scale-105 transition-transform">
            <FileText className="w-6 h-6 stroke-[2]" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-tight text-slate-800 text-center">
            PDF
          </span>
        </button>

        {/* Word */}
        <button
          type="button"
          onClick={() => onUploadClick?.("docx")}
          className="group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-3xl bg-[#EDE9FE] hover:bg-[#DDD6FE] text-slate-800 transition-all duration-200 border border-[#DDD6FE]/60 shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#6D28D9] mb-2.5 group-hover:scale-105 transition-transform">
            <FileText className="w-6 h-6 stroke-[2]" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-tight text-slate-800 text-center">
            Word
          </span>
        </button>

        {/* Excel */}
        <button
          type="button"
          onClick={() => onUploadClick?.("xlsx")}
          className="group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-3xl bg-[#DCFCE7] hover:bg-[#BBF7D0] text-slate-800 transition-all duration-200 border border-[#BBF7D0]/60 shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#15803D] mb-2.5 group-hover:scale-105 transition-transform">
            <FileSpreadsheet className="w-6 h-6 stroke-[2]" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-tight text-slate-800 text-center">
            Excel
          </span>
        </button>

        {/* PowerPoint */}
        <button
          type="button"
          onClick={() => onUploadClick?.("pptx")}
          className="group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-3xl bg-[#F5F3FF] hover:bg-[#EDE9FE] text-slate-800 transition-all duration-200 border border-[#E0E7FF]/60 shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#D97706] mb-2.5 group-hover:scale-105 transition-transform">
            <Presentation className="w-6 h-6 stroke-[2]" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-tight text-slate-800 text-center">
            PowerPoint
          </span>
        </button>
      </div>

      {/* Full-width Blank Doc card matching Figma screen 1 */}
      <button
        type="button"
        onClick={onBlankDocClick}
        className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-3xl bg-[#FEF3C7] hover:bg-[#FDE68A] text-slate-900 transition-all duration-200 border border-[#FDE68A]/60 shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
      >
        <div className="w-8 h-8 rounded-xl bg-white shadow-xs flex items-center justify-center text-[#B45309]">
          <FilePlus className="w-4 h-4 stroke-[2.2]" />
        </div>
        <span className="text-sm font-bold tracking-tight text-slate-900">
          Create blank doc
        </span>
      </button>
    </div>
  );
}
