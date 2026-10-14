"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Mic,
  Bell,
  UploadCloud,
  Menu,
  X,
  Sparkles,
  Layers,
  Camera,
  RefreshCw,
  Settings,
} from "lucide-react";
import { DocumentUploadModal } from "@/components/documents/DocumentUploadModal";
import { DocumentItem } from "@/types/document";

interface TopBarProps {
  onSearch?: (query: string) => void;
  onUploadSuccess?: (docs: DocumentItem[]) => void;
  title?: string;
  subtitle?: string;
}

export function TopBar({
  onSearch,
  onUploadSuccess,
  title,
  subtitle,
}: TopBarProps) {
  const [searchVal, setSearchVal] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Mobile branding or page title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          <div className="flex flex-col">
            {title ? (
              <>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-xs text-slate-500 font-medium hidden sm:block">
                    {subtitle}
                  </p>
                )}
              </>
            ) : (
              <div className="flex items-center gap-2 md:hidden">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                </div>
                <span className="font-extrabold text-sm text-slate-900">
                  Universal Hub
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Center: Search Bar matching Figma's "Ask or search for anything" */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchVal}
              onChange={handleSearchChange}
              placeholder="Ask or search for anything..."
              className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder-slate-400 text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-full border border-slate-200/80 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
            <button
              type="button"
              className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-full transition"
              title="Voice query (simulated)"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold text-white bg-slate-900 hover:bg-black shadow-xs transition-all hover:scale-102"
          >
            <UploadCloud className="w-4 h-4" />
            <span className="hidden sm:inline">Upload</span>
          </button>

          {/* Notifications */}
          <button
            type="button"
            onClick={() => setHasNotifications(false)}
            className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 transition"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {hasNotifications && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* User Profile Avatar */}
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center ring-2 ring-slate-100">
            P
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs flex">
          <div className="w-3/4 max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-left duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                  </div>
                  <span className="font-extrabold text-sm text-slate-900">
                    Universal Hub
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="space-y-2">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <Layers className="w-4 h-4 text-slate-500" />
                  Dashboard
                </Link>
                <Link
                  href="/documents"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <Layers className="w-4 h-4 text-slate-500" />
                  Document Hub
                </Link>
                <Link
                  href="/workspace"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  AI Workspace
                </Link>
                <Link
                  href="/scanner"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <Camera className="w-4 h-4 text-sky-600" />
                  Smart Scanner
                </Link>
                <Link
                  href="/convert"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <RefreshCw className="w-4 h-4 text-emerald-600" />
                  Convert & Optimize
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <Settings className="w-4 h-4 text-slate-500" />
                  Settings
                </Link>
              </nav>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 font-medium">
                Signed in as Peter Anderson
              </p>
            </div>
          </div>
          <div
            className="flex-1"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      )}

      {/* Upload modal */}
      <DocumentUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={(docs) => {
          onUploadSuccess?.(docs);
        }}
      />
    </>
  );
}
