"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Clock,
  Sparkles,
  HardDrive,
  LayoutGrid,
  List as ListIcon,
  Search,
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  FileCheck,
  Plus,
} from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopBar } from "@/components/layout/TopBar";
import { FloatingMobileNav } from "@/components/layout/FloatingMobileNav";
import { PastelActionGrid } from "@/components/documents/PastelActionGrid";
import { DocumentCard } from "@/components/documents/DocumentCard";
import { DocumentUploadModal } from "@/components/documents/DocumentUploadModal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ToastProvider, useToast } from "@/components/ui/ToastNotification";
import { MOCK_DOCUMENTS, MOCK_ACTIVITIES } from "@/lib/mock-data";
import { DocumentItem } from "@/types/document";

function DashboardContent() {
  const [documents, setDocuments] = useState<DocumentItem[]>(MOCK_DOCUMENTS);
  const [activities, setActivities] = useState(MOCK_ACTIVITIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const { success } = useToast();

  const filteredDocs = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.fileType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUploadSuccess = (newDocs: DocumentItem[]) => {
    setDocuments((prev) => [...newDocs, ...prev]);
    // add activity
    const newActivities = newDocs.map((d) => ({
      id: `act-${Date.now()}-${Math.random()}`,
      action: "uploaded" as const,
      documentName: d.name,
      timestamp: "Just now",
      documentId: d.id,
    }));
    setActivities((prev) => [...newActivities, ...prev]);
  };

  const confirmDelete = () => {
    if (!deleteTargetId) return;
    const targetDoc = documents.find((d) => d.id === deleteTargetId);
    setDocuments((prev) => prev.filter((d) => d.id !== deleteTargetId));
    setDeleteTargetId(null);
    success("Document Deleted", `Removed "${targetDoc?.name || "document"}" from workspace.`);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar for Desktop */}
      <AppSidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-28 md:pb-12">
        <TopBar
          onSearch={(q) => setSearchQuery(q)}
          onUploadSuccess={handleUploadSuccess}
          title="Good morning, Peter!"
          subtitle="Your documents, organized in one intelligent workspace."
        />

        <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
          {/* Welcome Banner / Overview stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Stat 1 */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Total Documents</span>
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {documents.length}
              </p>
              <p className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>+2 added this week</span>
              </p>
            </div>

            {/* Stat 2 */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Recently Opened</span>
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                4
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Last viewed 10 mins ago
              </p>
            </div>

            {/* Stat 3 */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">AI Processed</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <FileCheck className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                100%
              </p>
              <p className="text-[11px] font-semibold text-emerald-600 mt-1">
                OCR & Vectorized
              </p>
            </div>

            {/* Stat 4 */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Demo Storage</span>
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <HardDrive className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                2.4 GB
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Local mock memory
              </p>
            </div>
          </div>

          {/* Quick Actions (Screen 1 Reproduction) */}
          <section className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
            <PastelActionGrid
              onUploadClick={(filter) => setIsUploadModalOpen(true)}
              onBlankDocClick={() => {
                const blankDoc: DocumentItem = {
                  id: `blank-${Date.now()}`,
                  name: `Untitled Document ${documents.length + 1}.docx`,
                  fileType: "docx",
                  size: 14000,
                  updatedAt: new Date().toISOString(),
                  status: "ready",
                  category: "General",
                  pageCount: 1,
                  summary: "New empty document created. Ready for typing and AI editing.",
                  extractedText: "Empty document.",
                };
                setDocuments([blankDoc, ...documents]);
                success("Blank Document Created", `Created "${blankDoc.name}".`);
              }}
            />
          </section>

          {/* Recent Documents Section */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                  Recent Documents
                </h2>
                <p className="text-xs text-slate-500">
                  All supported formats: PDF, Word, Excel, PowerPoint, and receipts
                </p>
              </div>

              {/* View Switcher & Filter */}
              <div className="flex items-center gap-2">
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

                <Link
                  href="/documents"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-2xs transition"
                >
                  <span>View All Hub</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Documents List / Grid */}
            {filteredDocs.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white border border-slate-200/80">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-slate-800 text-base">
                  No documents found
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {searchQuery
                    ? `No files matching "${searchQuery}". Try clearing your search.`
                    : "Your workspace is empty. Upload or scan a document to get started."}
                </p>
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-black transition"
                >
                  Upload First Document
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
          </section>

          {/* Recent Activity Feed */}
          <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base mb-4">
              Recent Workspace Activity
            </h3>
            <div className="space-y-3">
              {activities.map((act) => (
                <div
                  key={act.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 border border-slate-100 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white shadow-2xs border border-slate-100 flex items-center justify-center text-slate-600">
                      {act.action === "scanned" && (
                        <Sparkles className="w-4 h-4 text-sky-600" />
                      )}
                      {act.action === "queried" && (
                        <FileText className="w-4 h-4 text-purple-600" />
                      )}
                      {act.action === "uploaded" && (
                        <Plus className="w-4 h-4 text-emerald-600" />
                      )}
                      {act.action === "converted" && (
                        <Clock className="w-4 h-4 text-amber-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">
                        <span className="capitalize">{act.action}</span>{" "}
                        <span className="text-indigo-600 font-bold">
                          "{act.documentName}"
                        </span>
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {act.timestamp}
                      </p>
                    </div>
                  </div>
                  {act.documentId && (
                    <Link
                      href={`/documents/${act.documentId}`}
                      className="text-xs font-bold text-slate-500 hover:text-slate-900"
                    >
                      Open
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Floating Mobile Nav bar matching Figma */}
      <FloatingMobileNav
        onQuickAction={() => setIsUploadModalOpen(true)}
      />

      {/* Upload Modal */}
      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Document"
        description="Are you sure you want to remove this document from your workspace? This action only removes it from your current browser memory session."
        confirmLabel="Delete"
        isDestructive
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ToastProvider>
      <DashboardContent />
    </ToastProvider>
  );
}
