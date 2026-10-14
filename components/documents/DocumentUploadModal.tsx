"use client";

import React, { useState, useRef } from "react";
import {
  UploadCloud,
  X,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
} from "lucide-react";
import { DocumentItem, FileType } from "@/types/document";
import { formatBytes } from "@/lib/utils";
import { useToast } from "@/components/ui/ToastNotification";

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (newDocs: DocumentItem[]) => void;
}

const ALLOWED_EXTENSIONS = [
  "pdf",
  "docx",
  "doc",
  "xlsx",
  "xls",
  "pptx",
  "ppt",
  "jpeg",
  "jpg",
  "png",
  "txt",
];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export function DocumentUploadModal({
  isOpen,
  onClose,
  onUploadSuccess,
}: DocumentUploadModalProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { success, error } = useToast();

  if (!isOpen) return null;

  const validateAndAddFiles = (files: FileList | File[]) => {
    setErrorMsg(null);
    const newFiles: File[] = [];

    Array.from(files).forEach((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase() || "";
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        setErrorMsg(`Format .${ext} is not supported. Supported: PDF, Word, Excel, PPT, JPG, PNG, TXT.`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setErrorMsg(`File "${file.name}" exceeds the 50MB limit.`);
        return;
      }
      newFiles.push(file);
    });

    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndAddFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUploadSubmit = () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    setUploadProgress(15);

    // Simulate upload progression
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 25;
      });
    }, 250);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);

      // Create memory DocumentItems
      const createdDocs: DocumentItem[] = selectedFiles.map((file) => {
        const ext = file.name.split(".").pop()?.toLowerCase() || "txt";
        let mappedType: FileType = "txt";
        if (ext === "pdf") mappedType = "pdf";
        else if (["doc", "docx"].includes(ext)) mappedType = "docx";
        else if (["xls", "xlsx"].includes(ext)) mappedType = "xlsx";
        else if (["ppt", "pptx"].includes(ext)) mappedType = "pptx";
        else if (["jpg", "jpeg", "png"].includes(ext)) mappedType = "image";

        return {
          id: `uploaded-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          name: file.name,
          fileType: mappedType,
          size: file.size,
          updatedAt: new Date().toISOString(),
          status: "ready",
          category: "General",
          pageCount: mappedType === "pdf" ? Math.floor(Math.random() * 8) + 1 : 1,
          tags: ["Uploaded", "Browser Memory"],
          summary: `Uploaded document "${file.name}". Ready for AI summary and search queries.`,
          extractedText: `Extracted preview of ${file.name}.\nThis file was loaded locally in memory during this frontend session.`,
        };
      });

      onUploadSuccess(createdDocs);
      success("Upload Complete", `${selectedFiles.length} document(s) loaded into memory.`);
      setUploading(false);
      setSelectedFiles([]);
      setUploadProgress(0);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Upload Documents
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Files are processed securely in your browser memory (Frontend Demo)
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={uploading}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl transition hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Drag & Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
              dragOver
                ? "border-blue-500 bg-blue-50/50 scale-[0.99]"
                : "border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50"
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 shadow-xs">
              <UploadCloud className="w-7 h-7" />
            </div>
            <p className="text-sm font-semibold text-slate-800">
              Click to select or drag and drop files here
            </p>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              PDF, Word (.docx), Excel (.xlsx), PowerPoint (.pptx), Images, or TXT
              (Max 50MB)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files) validateAndAddFiles(e.target.files);
              }}
            />
          </div>

          {/* Selected Files List */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 px-1">
                <span>Selected Files ({selectedFiles.length})</span>
                <button
                  type="button"
                  onClick={() => setSelectedFiles([])}
                  className="text-rose-500 hover:text-rose-600 transition"
                >
                  Clear all
                </button>
              </div>

              <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                {selectedFiles.map((f, i) => (
                  <div
                    key={`${f.name}-${i}`}
                    className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-slate-600" />
                      </div>
                      <div className="truncate">
                        <p className="font-medium text-slate-800 truncate">
                          {f.name}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {formatBytes(f.size)}
                        </p>
                      </div>
                    </div>
                    {!uploading && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(i);
                        }}
                        className="text-slate-400 hover:text-rose-600 p-1 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {uploading && (
            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-blue-900 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                  Processing documents into workspace...
                </span>
                <span className="font-bold text-blue-700">
                  {uploadProgress}%
                </span>
              </div>
              <div className="w-full bg-blue-200/50 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Frontend demonstration mode
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              disabled={uploading}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              onClick={handleUploadSubmit}
              disabled={selectedFiles.length === 0 || uploading}
              className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-black disabled:opacity-50 disabled:pointer-events-none rounded-xl transition shadow-xs flex items-center gap-1.5"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <UploadCloud className="w-3.5 h-3.5" />
                  Add to Hub ({selectedFiles.length})
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
