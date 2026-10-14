import React from "react";
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  Image as ImageIcon,
  FileCode,
  File,
} from "lucide-react";
import { FileType } from "@/types/document";

interface FileTypeIconProps {
  type: FileType | string;
  className?: string;
  size?: number;
  showBadge?: boolean;
}

export function FileTypeIcon({
  type,
  className = "w-5 h-5",
  size = 20,
  showBadge = false,
}: FileTypeIconProps) {
  const normalizedType = type.toLowerCase();

  let icon = <FileText className={className} size={size} />;
  let badgeColor = "bg-blue-50 text-blue-600 border-blue-200";
  let label = "FILE";

  if (normalizedType.includes("pdf")) {
    icon = <FileText className={className} size={size} />;
    badgeColor = "bg-rose-50 text-rose-600 border-rose-200";
    label = "PDF";
  } else if (normalizedType.includes("doc")) {
    icon = <FileText className={className} size={size} />;
    badgeColor = "bg-indigo-50 text-indigo-600 border-indigo-200";
    label = "DOCX";
  } else if (normalizedType.includes("xls") || normalizedType.includes("sheet")) {
    icon = <FileSpreadsheet className={className} size={size} />;
    badgeColor = "bg-emerald-50 text-emerald-600 border-emerald-200";
    label = "EXCEL";
  } else if (normalizedType.includes("ppt") || normalizedType.includes("presentation")) {
    icon = <Presentation className={className} size={size} />;
    badgeColor = "bg-amber-50 text-amber-600 border-amber-200";
    label = "PPT";
  } else if (
    normalizedType.includes("image") ||
    normalizedType.includes("jpg") ||
    normalizedType.includes("png") ||
    normalizedType.includes("jpeg")
  ) {
    icon = <ImageIcon className={className} size={size} />;
    badgeColor = "bg-purple-50 text-purple-600 border-purple-200";
    label = "IMG";
  } else if (normalizedType.includes("txt")) {
    icon = <FileCode className={className} size={size} />;
    badgeColor = "bg-slate-50 text-slate-600 border-slate-200";
    label = "TXT";
  }

  if (showBadge) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${badgeColor}`}
      >
        {icon}
        <span>{label}</span>
      </span>
    );
  }

  return icon;
}
