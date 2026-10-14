"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Sparkles,
  Camera,
  RefreshCw,
  Settings,
  HardDrive,
  FileText,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();

  const navLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: undefined,
    },
    {
      label: "Document Hub",
      href: "/documents",
      icon: FolderOpen,
      badge: "6 files",
    },
    {
      label: "AI Workspace",
      href: "/workspace",
      icon: Sparkles,
      badge: "AI",
      badgeColor: "bg-indigo-100 text-indigo-700",
    },
    {
      label: "Smart Scanner",
      href: "/scanner",
      icon: Camera,
      badge: "OCR",
    },
    {
      label: "Convert & Optimize",
      href: "/convert",
      icon: RefreshCw,
      badge: undefined,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
      badge: undefined,
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 border-r border-slate-200/80 bg-white/95 backdrop-blur-md h-screen sticky top-0 shrink-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-100">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-800 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-sky-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              Document Hub
            </span>
            <span className="text-[11px] font-medium text-slate-400">
              AI Workspace Platform
            </span>
          </div>
        </Link>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Main Menu
        </div>
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-white" : "text-slate-400"
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : item.badgeColor || "bg-slate-100 text-slate-600"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Storage & User Profile */}
      <div className="p-4 border-t border-slate-100 space-y-4">
        {/* Mock storage meter */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
          <div className="flex items-center justify-between font-semibold text-slate-700 mb-1.5">
            <span className="flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-slate-400" />
              Demo Storage
            </span>
            <span className="text-[11px] text-slate-500">2.4 / 10 GB</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-sky-500 to-indigo-600 h-1.5 rounded-full w-[24%]" />
          </div>
          <p className="text-[10px] text-slate-400 mt-1.5 leading-tight">
            Files stored locally in browser session
          </p>
        </div>

        {/* User Profile */}
        <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50 transition cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs shadow-xs">
              P
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900">
                Peter Anderson
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                peter@docspace.ai
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </aside>
  );
}
