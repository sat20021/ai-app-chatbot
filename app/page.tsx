"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  FolderOpen,
  Camera,
  RefreshCw,
  FileText,
  FileSpreadsheet,
  Presentation,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Bot,
  Search,
  Layers,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { ToastProvider } from "@/components/ui/ToastNotification";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"hub" | "ai" | "scanner" | "convert">("hub");

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-100 flex flex-col">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-800 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-sky-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-slate-900">
                  Document Hub
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  AI Workspace
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
              <Link
                href="/dashboard"
                className="hover:text-slate-900 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/documents"
                className="hover:text-slate-900 transition-colors"
              >
                Document Hub
              </Link>
              <Link
                href="/workspace"
                className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
              >
                <span>AI Workspace</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-600">
                  New
                </span>
              </Link>
              <Link
                href="/scanner"
                className="hover:text-slate-900 transition-colors"
              >
                Smart Scanner
              </Link>
              <Link
                href="/convert"
                className="hover:text-slate-900 transition-colors"
              >
                Convert
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-full transition"
              >
                Sign In
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-slate-900 hover:bg-black shadow-md shadow-slate-900/10 hover:shadow-lg transition-all hover:scale-102"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-16 sm:pt-24 pb-16 px-4 sm:px-8 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 border border-slate-200 text-xs font-semibold text-slate-700 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Intelligent Multi-Format Document Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.1] max-w-4xl mx-auto">
            Every Document. <br />
            <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-sky-700 bg-clip-text text-transparent">
              One Intelligent Workspace.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Consolidate your PDFs, Word documents, Excel spreadsheets, slide
            decks, and paper receipts into an ultra-fast AI-assisted hub. Scan,
            summarize, search, and convert in seconds.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold text-base hover:bg-black shadow-lg shadow-slate-900/15 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/workspace"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-800 font-bold text-base hover:bg-slate-50 shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Explore AI Workspace</span>
            </Link>
          </div>

          {/* Social proof / badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Instant Local OCR</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Multi-Format Document Chat</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Zero Backend Latency Demo</span>
            </div>
          </div>
        </section>

        {/* Product Preview Section with Figma Aesthetics */}
        <section className="px-4 sm:px-8 max-w-6xl mx-auto w-full mb-24">
          <div className="relative rounded-3xl bg-white p-4 sm:p-8 shadow-2xl border border-slate-200/90 overflow-hidden">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs font-mono font-medium text-slate-400">
                  universal-document-hub.internal/preview
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full transition"
                >
                  <span>Open Live Demo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Dashboard interactive preview */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Document Creation grid (Figma screen 1 inspired) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 text-sm">
                      Select document creation
                    </h3>
                    <span className="text-xs text-slate-400">Figma Reference</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="p-3 rounded-2xl bg-[#E0F2FE] border border-[#BAE6FD] flex flex-col items-center text-center">
                      <div className="w-8 h-8 rounded-xl bg-white shadow-xs flex items-center justify-center text-[#0284C7] mb-1.5">
                        <Camera className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-800">
                        Scan doc
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#F3E8FF] border border-[#E9D5FF] flex flex-col items-center text-center">
                      <div className="w-8 h-8 rounded-xl bg-white shadow-xs flex items-center justify-center text-[#9333EA] mb-1.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-800">
                        Upload
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#DCFCE7] border border-[#BBF7D0] flex flex-col items-center text-center">
                      <div className="w-8 h-8 rounded-xl bg-white shadow-xs flex items-center justify-center text-[#15803D] mb-1.5">
                        <FileSpreadsheet className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-800">
                        Excel
                      </span>
                    </div>
                  </div>

                  <div className="mt-2.5 p-2.5 rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      Create blank doc
                    </span>
                  </div>
                </div>

                {/* Sample Document Card */}
                <div className="p-4 rounded-3xl bg-gradient-to-r from-sky-50 to-indigo-50/40 border border-sky-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center text-rose-500 font-bold text-xs">
                      PDF
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Annual Report 2025.pdf
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        4.8 MB • 42 pages • AI Indexed
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/documents/doc-report-02"
                    className="px-3 py-1.5 rounded-xl bg-white text-xs font-bold text-slate-800 shadow-xs hover:bg-slate-50 transition"
                  >
                    View
                  </Link>
                </div>
              </div>

              {/* Right Column: AI Workspace Chat (Figma screen 5 inspired) */}
              <div className="lg:col-span-5 p-5 rounded-3xl bg-slate-50 border border-slate-100 space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">
                      AI Workspace Preview
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>

                {/* Chat bubbles */}
                <div className="space-y-3 text-xs">
                  {/* User message */}
                  <div className="flex justify-end gap-2">
                    <div className="bg-slate-900 text-white px-3.5 py-2.5 rounded-2xl rounded-tr-xs max-w-[85%] font-medium">
                      Can you summarize the text in the document?
                    </div>
                    <div className="w-6 h-6 rounded-full bg-slate-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                      P
                    </div>
                  </div>

                  {/* AI message */}
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                      AI
                    </div>
                    <div className="bg-white border border-slate-200/80 px-3.5 py-2.5 rounded-2xl rounded-tl-xs max-w-[85%] text-slate-700 shadow-2xs space-y-1">
                      <p>
                        Sure! The receipt is for groceries from New York Grocery.
                      </p>
                      <ul className="list-disc pl-4 text-[11px] text-slate-500 space-y-0.5">
                        <li>Subtotal: $25.75 | Tax: $2.28</li>
                        <li>Total: $29.58 via Visa</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Link
                  href="/workspace"
                  className="w-full mt-2 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-black transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  Try AI Workspace
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Feature Cards (Corresponding directly to Screenshot 2) */}
        <section className="px-4 sm:px-8 max-w-6xl mx-auto w-full mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Four Core Pillars of Your Workspace
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
              Inspired by the Figma design architecture with Hindi and bilingual
              support readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Universal Document Hub */}
            <Link
              href="/documents"
              className="group p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <FolderOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                Universal Document Hub
              </h3>
              <p className="mt-2 text-slate-600 font-medium">
                PDF, Word, Excel, PowerPoint, Images और अन्य फाइलें
              </p>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Single unified interface for all major formats. Search, filter,
                organize, and manage your documents with zero context switching.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-indigo-600 group-hover:gap-3 transition-all">
                <span>Open Document Hub</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Card 2: AI Workspace */}
            <Link
              href="/workspace"
              className="group p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                AI Workspace
              </h3>
              <p className="mt-2 text-slate-600 font-medium">
                चैट, समरी, अनुवाद, प्रश्नोत्तर और लेखन
              </p>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Chat natively with your documents. Extract action items,
                translate text into multiple languages including Hindi, and
                generate executive briefs.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-indigo-600 group-hover:gap-3 transition-all">
                <span>Launch AI Chat</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Card 3: Smart Scanner */}
            <Link
              href="/scanner"
              className="group p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Camera className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                Smart Scanner
              </h3>
              <p className="mt-2 text-slate-600 font-medium">
                कैमरे से स्कैन, OCR और PDF निर्माण
              </p>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Capture physical documents and receipts directly through your
                browser or webcam. Run instant text recognition and export clean
                PDFs.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-indigo-600 group-hover:gap-3 transition-all">
                <span>Start Scanning</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Card 4: Convert & Optimize */}
            <Link
              href="/convert"
              className="group p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <RefreshCw className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                Convert & Optimize
              </h3>
              <p className="mt-2 text-slate-600 font-medium">
                फॉर्मेट परिवर्तन, कंप्रेशन और फाइल प्रबंधन
              </p>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Convert images, markdown, and text to PDF. Optimize document
                sizes for easy email delivery while maintaining crisp clarity.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-indigo-600 group-hover:gap-3 transition-all">
                <span>Convert Files</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="px-4 sm:px-8 max-w-5xl mx-auto w-full mb-24">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              How It Works
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500">
              Simple 4-step workflow to master all your documents
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                Upload or Scan
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Drop your PDF, Word, Excel, or camera receipt directly into your
                secure workspace.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                Extract Content
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our OCR and layout engine extracts text, line items, tables, and
                metadata.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                Ask Questions
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Query your documents using conversational prompts, request
                summaries, or translate.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center mb-4">
                4
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                Export & Share
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Convert formats, copy answers, or export synthesized reports
                instantly.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-200 bg-white py-12 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-sky-400" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-slate-900">
                  Universal Document Hub
                </p>
                <p className="text-[11px] text-slate-400">
                  AI-Powered Workspace • Frontend Demo Phase
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs font-semibold text-slate-500">
              <Link href="/dashboard" className="hover:text-slate-900 transition">
                Dashboard
              </Link>
              <Link href="/documents" className="hover:text-slate-900 transition">
                Documents
              </Link>
              <Link href="/workspace" className="hover:text-slate-900 transition">
                AI Workspace
              </Link>
              <Link href="/scanner" className="hover:text-slate-900 transition">
                Smart Scanner
              </Link>
              <Link href="/settings" className="hover:text-slate-900 transition">
                Privacy & Settings
              </Link>
            </div>

            <p className="text-xs text-slate-400">
              © 2025 Universal Document Hub. Built with Next.js & Tailwind.
            </p>
          </div>
        </footer>
      </div>
    </ToastProvider>
  );
}
