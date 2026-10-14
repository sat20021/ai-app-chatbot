"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FolderOpen,
  Search,
  Filter,
  ArrowUpDown,
  LayoutGrid,
  List as ListIcon,
  Plus,
  Camera,
  Image as ImageIcon,
  FileText,
  FileSpreadsheet,
  Presentation,
  Receipt,
  FileCode,
  Tag,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopBar } from "@/components/layout/TopBar";
import { FloatingMobileNav } from "@/components/layout/FloatingMobileNav";
import { PastelActionGrid } from "@/components/documents/PastelActionGrid";
import { DocumentCard } from "@/components/documents/DocumentCard";
import { DocumentUploadModal } from "@/components/documents/DocumentUploadModal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ToastProvider, useToast } from "@/components/ui/ToastNotification";
import { MOCK_DOCUMENTS } from "@/lib/mock-data";
import { DocumentItem } from "@/types/document";

function DocumentHubContent() {
  const [documents, setDocuments] = useState<DocumentItem[]>(MOCK_DOCUMENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFormatFilter, setSelectedFormatFilter] = useState<string>("all");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "name" | "size">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const { success } = useToast();

  // Filter logic
  const filteredDocs = documents
    .filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.fileType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.tags && doc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesFormat =
        selectedFormatFilter === "all" || doc.fileType === selectedFormatFilter;

      const matchesCategory =
        selectedCategoryFilter === "all" || doc.category.toLowerCase() === selectedCategoryFilter.toLowerCase();

      return matchesSearch && matchesFormat && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortBy === "size") {
        return sortOrder === "asc" ? a.size - b.size : b.size - a.size;
      }
      // date
      return sortOrder === "asc"
        ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  const handleUploadSuccess = (newDocs: DocumentItem[]) => {
    setDocuments((prev) => [...newDocs, ...prev]);
  };

  const confirmDelete = () => {
    if (!deleteTargetId) return;
    const target = documents.find((d) => d.id === deleteTargetId);
    setDocuments((prev) => prev.filter((d) => d.id !== deleteTargetId));
    setDeleteTargetId(null);
    success("Document Deleted", `Removed "${target?.name || "document"}" from hub.`);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 pb-28 md:pb-12">
        <TopBar
          onSearch={(q) => setSearchQuery(q)}
          onUploadSuccess={handleUploadSuccess}
          title="Universal Document Hub"
          subtitle="All your files, organized in one place."
        />

        <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
          {/* Header Description & Action Grid */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Universal Document Hub
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Manage, preview, and extract intelligence from PDFs, Office files, receipts, and images.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsUploadOpen(true)}
                className="self-start sm:self-auto flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-md hover:shadow-lg transition-all hover:scale-102"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Files</span>
              </button>
            </div>

            {/* Figma Screen 1 creation grid */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
              <PastelActionGrid
                onUploadClick={(format) => {
                  if (format) setSelectedFormatFilter(format);
                  setIsUploadOpen(true);
                }}
                onBlankDocClick={() => {
                  const newDoc: DocumentItem = {
                    id: `blank-${Date.now()}`,
                    name: `Blank Doc ${documents.length + 1}.docx`,
                    fileType: "docx",
                    size: 15400,
                    updatedAt: new Date().toISOString(),
                    status: "ready",
                    category: "General",
                    pageCount: 1,
                    summary: "Fresh blank document created in session.",
                    extractedText: "New document content.",
                  };
                  setDocuments([newDoc, ...documents]);
                  success("Document Created", `Created "${newDoc.name}".`);
                }}
              />
            </div>
          </div>

          {/* Figma Screen 2 "Recognized Formats" Showcase Section */}
          <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Recognized Formats & Smart Parsing
                </h3>
                <p className="text-xs text-slate-500">
                  Instant receipt parsing and automated table structuring
                </p>
              </div>
              <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                Auto-Classified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Receipt parsing card */}
              <Link
                href="/documents/doc-receipt-01"
                className="p-4 rounded-2xl bg-slate-50 hover:bg-purple-50/50 border border-slate-100 hover:border-purple-200 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-purple-700">
                      Full Receipt
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Extracted itemized totals ($29.58)
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Just the total */}
              <Link
                href="/documents/doc-sales-04"
                className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-100 hover:border-emerald-200 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">
                      Financial Breakdown
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Quarterly actuals & targets
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Executive Summary */}
              <Link
                href="/documents/doc-report-02"
                className="p-4 rounded-2xl bg-slate-50 hover:bg-sky-50/50 border border-slate-100 hover:border-sky-200 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-sky-700">
                      Executive Report
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Annual review & ARR forecast
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>

          {/* Filters, Search, and Sort Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Format Filter Pills (matching Figma screen 2 pills) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedFormatFilter("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                  selectedFormatFilter === "all"
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                All Formats
              </button>
              <button
                type="button"
                onClick={() => setSelectedFormatFilter("pdf")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                  selectedFormatFilter === "pdf"
                    ? "bg-sky-600 text-white shadow-2xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                PDF
              </button>
              <button
                type="button"
                onClick={() => setSelectedFormatFilter("docx")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                  selectedFormatFilter === "docx"
                    ? "bg-purple-600 text-white shadow-2xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                Word (.docx)
              </button>
              <button
                type="button"
                onClick={() => setSelectedFormatFilter("xlsx")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                  selectedFormatFilter === "xlsx"
                    ? "bg-emerald-600 text-white shadow-2xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                Excel (.xlsx)
              </button>
              <button
                type="button"
                onClick={() => setSelectedFormatFilter("pptx")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                  selectedFormatFilter === "pptx"
                    ? "bg-amber-600 text-white shadow-2xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                PPT (.pptx)
              </button>
              <button
                type="button"
                onClick={() => setSelectedFormatFilter("image")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                  selectedFormatFilter === "image"
                    ? "bg-pink-600 text-white shadow-2xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                Images & Receipts
              </button>
            </div>

            {/* Sort Controls and View Switcher */}
            <div className="flex items-center gap-2 self-end lg:self-auto">
              {/* Category dropdown */}
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none hover:bg-slate-50"
              >
                <option value="all">All Categories</option>
                <option value="reports">Reports</option>
                <option value="finance">Finance</option>
                <option value="receipts">Receipts</option>
                <option value="contracts">Contracts</option>
                <option value="general">General</option>
              </select>

              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none hover:bg-slate-50"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="size">Sort by Size</option>
              </select>

              {/* Sort Order button */}
              <button
                type="button"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
                title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>

              {/* Grid / List toggle */}
              <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition ${
                    viewMode === "grid"
                      ? "bg-slate-900 text-white"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition ${
                    viewMode === "list"
                      ? "bg-slate-900 text-white"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                  title="List View"
                >
                  <ListIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Document Content List / Grid */}
          {filteredDocs.length === 0 ? (
            <div className="p-16 text-center rounded-3xl bg-white border border-slate-200/80 shadow-xs">
              <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800 text-base">
                No matching documents
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try adjusting your search criteria, clearing filters, or upload a new file.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFormatFilter("all");
                  setSelectedCategoryFilter("all");
                }}
                className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
              >
                Reset Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocs.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  viewMode="grid"
                  onDelete={(id) => setDeleteTargetId(id)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredDocs.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  viewMode="list"
                  onDelete={(id) => setDeleteTargetId(id)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <FloatingMobileNav onQuickAction={() => setIsUploadOpen(true)} />

      <DocumentUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Document"
        description="Are you sure you want to delete this file from your session? This action cannot be undone."
        confirmLabel="Delete"
        isDestructive
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}

export default function DocumentHubPage() {
  return (
    <ToastProvider>
      <DocumentHubContent />
    </ToastProvider>
  );
}
