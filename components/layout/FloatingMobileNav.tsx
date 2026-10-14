"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, Sparkles, Plus, SlidersHorizontal, Camera } from "lucide-react";

interface FloatingMobileNavProps {
  onQuickAction?: () => void;
}

export function FloatingMobileNav({ onQuickAction }: FloatingMobileNavProps) {
  const pathname = usePathname();

  const isDocuments = pathname.startsWith("/documents") || pathname === "/dashboard";
  const isWorkspace = pathname.startsWith("/workspace");
  const isScanner = pathname.startsWith("/scanner");
  const isSettings = pathname.startsWith("/settings");

  return (
    <div className="md:hidden fixed bottom-5 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
      <div className="pointer-events-auto flex items-center justify-between gap-1.5 p-1.5 px-3 rounded-full bg-[#111215] text-white shadow-2xl border border-white/10 backdrop-blur-xl">
        {/* Document Hub */}
        <Link
          href="/documents"
          className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 ${
            isDocuments
              ? "bg-white text-black shadow-md scale-105"
              : "text-zinc-400 hover:text-white hover:bg-white/10"
          }`}
          aria-label="Document Hub"
        >
          <Layers className="w-5 h-5 stroke-[2]" />
        </Link>

        {/* AI Workspace */}
        <Link
          href="/workspace"
          className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 ${
            isWorkspace
              ? "bg-white text-black shadow-md scale-105"
              : "text-zinc-400 hover:text-white hover:bg-white/10"
          }`}
          aria-label="AI Workspace"
        >
          <Sparkles className="w-5 h-5 stroke-[2]" />
        </Link>

        {/* Central Action Button */}
        <button
          type="button"
          onClick={() => {
            if (onQuickAction) {
              onQuickAction();
            } else {
              window.location.href = "/scanner";
            }
          }}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:scale-105 transition-transform"
          aria-label="Quick Scan or Upload"
        >
          <Camera className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* Convert & Tools */}
        <Link
          href="/convert"
          className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 ${
            pathname.startsWith("/convert")
              ? "bg-white text-black shadow-md scale-105"
              : "text-zinc-400 hover:text-white hover:bg-white/10"
          }`}
          aria-label="Convert & Tools"
        >
          <Plus className="w-5 h-5 stroke-[2]" />
        </Link>

        {/* Settings */}
        <Link
          href="/settings"
          className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 ${
            isSettings
              ? "bg-white text-black shadow-md scale-105"
              : "text-zinc-400 hover:text-white hover:bg-white/10"
          }`}
          aria-label="Settings"
        >
          <SlidersHorizontal className="w-5 h-5 stroke-[2]" />
        </Link>
      </div>
    </div>
  );
}
