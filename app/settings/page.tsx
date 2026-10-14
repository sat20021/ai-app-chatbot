"use client";

import React, { useState } from "react";
import {
  User,
  Sliders,
  Moon,
  Sun,
  Languages,
  Shield,
  Trash2,
  HardDrive,
  Check,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopBar } from "@/components/layout/TopBar";
import { FloatingMobileNav } from "@/components/layout/FloatingMobileNav";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ToastProvider, useToast } from "@/components/ui/ToastNotification";

export function SettingsContent() {
  const [name, setName] = useState("Peter Anderson");
  const [email, setEmail] = useState("peter@docspace.ai");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [autoOcr, setAutoOcr] = useState(true);
  const [autoSummarize, setAutoSummarize] = useState(true);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const { success, info } = useToast();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    success("Settings Saved", "Profile preferences have been updated.");
  };

  const handleResetData = () => {
    setIsResetConfirmOpen(false);
    success("Session Reset", "All local temporary session data has been reset.");
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 pb-28 md:pb-12">
        <TopBar
          title="Settings & Privacy"
          subtitle="Manage workspace preferences, language, and session storage."
        />

        <main className="flex-1 p-4 sm:p-8 max-w-4xl mx-auto w-full space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Settings & Privacy
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Configure your user profile, AI preferences, and transparent data privacy controls.
            </p>
          </div>

          {/* Profile Section */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  User Profile
                </h2>
                <p className="text-xs text-slate-400">
                  Your identity in collaborative workspaces
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-900 text-white font-extrabold text-lg flex items-center justify-center">
                  P
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    {name}
                  </h3>
                  <p className="text-xs text-slate-400">Product Lead • Enterprise Plan</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-black transition shadow-xs"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </section>

          {/* Preferences & Language */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Workspace Preferences
                </h2>
                <p className="text-xs text-slate-400">
                  AI behavior and localization settings
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">
                    Automatic Document OCR
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Automatically parse and index text immediately after upload
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={autoOcr}
                  onChange={(e) => setAutoOcr(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">
                    Auto-Generate Executive Briefs
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Draft a 3-bullet summary when opening a new document
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={autoSummarize}
                  onChange={(e) => setAutoSummarize(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Languages className="w-4 h-4 text-slate-500" />
                  <span>Workspace Language (भाषा)</span>
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => {
                    setSelectedLanguage(e.target.value);
                    success("Language Updated", "Interface language changed.");
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold outline-none"
                >
                  <option value="en">English (US)</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="es">Español (Spanish)</option>
                  <option value="fr">Français (French)</option>
                  <option value="de">Deutsch (German)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Transparent Privacy Information Section */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Data Privacy & Security Transparency
                </h2>
                <p className="text-xs text-slate-400">
                  Accurate disclosures regarding this frontend demonstration
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs text-slate-600 leading-relaxed">
              <p>
                <strong>Local Browser State:</strong> This platform is currently running
                in the frontend demonstration phase. Files and chats uploaded or
                generated are held in your browser session memory.
              </p>
              <p>
                <strong>No Fake Certifications:</strong> We do not claim third-party
                government compliance or false end-to-end encryption certifications.
                In Phase 2, an authenticated FastAPI backend with proper cryptographic
                token validation and encrypted object storage will be integrated.
              </p>
              <p>
                <strong>Zero Secret Exposure:</strong> No API keys or credentials
                are exposed in client-side code.
              </p>
            </div>
          </section>

          {/* Data Management & Deletion */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xs space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Data Management
                </h2>
                <p className="text-xs text-slate-400">
                  Reset session state or purge temporary files
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xs font-bold text-slate-800">
                  Reset Workspace Session Data
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Restores default mock documents and clears temporary chat threads.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition"
              >
                Reset Session Data
              </button>
            </div>
          </section>
        </main>
      </div>

      <FloatingMobileNav />

      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        title="Reset Workspace Data"
        description="Are you sure you want to restore default mock documents and clear active chat history? This only resets client-side memory."
        confirmLabel="Reset Session"
        isDestructive
        onConfirm={handleResetData}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <ToastProvider>
      <SettingsContent />
    </ToastProvider>
  );
}
