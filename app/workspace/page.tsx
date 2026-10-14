"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  Send,
  Bot,
  Copy,
  RotateCcw,
  Trash2,
  FileText,
  ChevronDown,
  Info,
  Check,
  Languages,
  Calendar,
  CheckSquare,
  TrendingUp,
  Mail,
  Loader2,
  Paperclip,
} from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopBar } from "@/components/layout/TopBar";
import { FloatingMobileNav } from "@/components/layout/FloatingMobileNav";
import { FileTypeIcon } from "@/components/ui/FileTypeIcon";
import { ToastProvider, useToast } from "@/components/ui/ToastNotification";
import {
  MOCK_DOCUMENTS,
  INITIAL_CHAT_MESSAGES,
  SUGGESTED_PROMPTS,
  MOCK_CONVERSATION_SESSIONS,
} from "@/lib/mock-data";
import { ChatMessage } from "@/types/chat";
import { DocumentItem } from "@/types/document";

function WorkspaceContent() {
  const searchParams = useSearchParams();
  const docParam = searchParams.get("doc");
  const { success, info } = useToast();

  const [documents, setDocuments] = useState<DocumentItem[]>(MOCK_DOCUMENTS);
  const [selectedDocId, setSelectedDocId] = useState<string>(
    docParam || "doc-receipt-01"
  );
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeDoc = documents.find((d) => d.id === selectedDocId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      senderName: "Peter",
      senderInitials: "P",
      content: text,
      timestamp: new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
      }).format(new Date()),
      documentRef: activeDoc
        ? { id: activeDoc.id, name: activeDoc.name }
        : undefined,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal("");
    setIsTyping(true);

    // Contextual demo response generation
    setTimeout(() => {
      let aiContent = "";
      let highlightPoints: string[] | undefined = undefined;
      const lower = text.toLowerCase();

      if (lower.includes("summar")) {
        aiContent = activeDoc
          ? `Here is the executive summary for ${activeDoc.name}: ${activeDoc.summary}`
          : "Please select a specific document from the top bar to generate a document-grounded summary.";
        highlightPoints = activeDoc
          ? [
              `Document: ${activeDoc.name}`,
              `Category: ${activeDoc.category}`,
              "Extraction status: 100% verified",
            ]
          : undefined;
      } else if (lower.includes("hindi") || lower.includes("translate")) {
        aiContent = activeDoc
          ? `अनुवाद (Hindi Translation):\n"${activeDoc.name}" का मुख्य विवरण: ${
              activeDoc.category === "Receipts"
                ? "यह न्यू यॉर्क ग्रॉसरी की रसीद है जिसका कुल खर्च $29.58 है।"
                : "यह कंपनी की वार्षिक प्रगति रिपोर्ट है जिसमें 34% राजस्व वृद्धि दिखाई गई है।"
            }`
          : "आप किसी दस्तावेज़ को चुनकर उसका हिंदी में अनुवाद प्राप्त कर सकते हैं।";
      } else if (lower.includes("date") || lower.includes("deadline")) {
        aiContent = activeDoc
          ? `All recorded timestamps and dates in ${activeDoc.name}:`
          : "Timestamps require document context.";
        highlightPoints = [
          `File modified: ${activeDoc?.updatedAt || "N/A"}`,
          "Extracted event: Q4 FY2025 Audit deadline: Nov 15",
          "Board meeting scheduled: March 24",
        ];
      } else if (lower.includes("action") || lower.includes("item")) {
        aiContent = "Here are the extracted action items identified in your workspace:";
        highlightPoints = [
          "Confirm vendor payment of $29.58 for grocery provisions",
          "Review executive forecast slides before Friday client sync",
          "Distribute finalized bug bounty guidelines",
        ];
      } else if (lower.includes("email")) {
        aiContent = `Subject: Briefing on ${activeDoc?.name || "Recent Document"}\n\nHi Team,\n\nPlease find the key points extracted from our workspace document. Total verified metrics and summaries have been processed and indexed.\n\nBest regards,\nPeter`;
      } else {
        aiContent = activeDoc
          ? `I've analyzed your question regarding "${activeDoc.name}". Based on the extracted text, the document contains verified information regarding ${activeDoc.category.toLowerCase()} and operational targets.`
          : "Hello Peter! You can ask general questions or select a specific document to enable deep contextual reasoning.";
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        senderName: "AI Assistant",
        senderInitials: "AI",
        content: aiContent,
        timestamp: new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "numeric",
        }).format(new Date()),
        highlightPoints,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 800);
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    success("Copied to clipboard", "Message text copied.");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([]);
    info("Conversation Cleared", "Started a fresh chat session.");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopBar
          title="AI Workspace"
          subtitle="Understand your documents. Get answers faster."
        />

        {/* Development Note Banner */}
        <div className="bg-gradient-to-r from-indigo-50 via-sky-50 to-purple-50 px-4 py-2 border-b border-indigo-100 flex items-center justify-between text-xs text-indigo-950">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="font-medium">
              <strong className="font-bold">Frontend AI Demo:</strong> Currently
              running fast local contextual logic. In Phase 2, connect your
              FastAPI `/api/chat` or LangChain endpoint here.
            </span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[10px] text-indigo-500 bg-white/70 px-2 py-0.5 rounded-md border border-indigo-200">
            POST /api/chat
          </span>
        </div>

        {/* Workspace Body: Left Session Sidebar + Main Chat */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Session List (Desktop) */}
          <div className="hidden lg:flex flex-col w-72 border-r border-slate-200 bg-white p-4 space-y-4 shrink-0 overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Active Document
              </span>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                Context
              </span>
            </div>

            {/* Document Selector Dropdown */}
            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-xs font-semibold text-slate-800 outline-none hover:bg-slate-100/70 transition"
            >
              {documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* Active Document Card Preview */}
            {activeDoc && (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white shadow-xs flex items-center justify-center">
                    <FileTypeIcon type={activeDoc.fileType} size={18} />
                  </div>
                  <div className="truncate">
                    <p className="font-bold text-slate-900 truncate">
                      {activeDoc.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {activeDoc.category} • {activeDoc.pageCount || 1} pages
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed">
                  {activeDoc.summary}
                </p>
                <Link
                  href={`/documents/${activeDoc.id}`}
                  className="inline-block text-[11px] font-bold text-indigo-600 hover:underline"
                >
                  View full document →
                </Link>
              </div>
            )}

            {/* Past Sessions */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Recent Conversations
              </span>
              <div className="space-y-1">
                {MOCK_CONVERSATION_SESSIONS.map((sess) => (
                  <button
                    key={sess.id}
                    onClick={() => {
                      if (sess.documentId) setSelectedDocId(sess.documentId);
                      info("Session Switched", sess.title);
                    }}
                    className="w-full text-left p-2.5 rounded-xl text-xs hover:bg-slate-100 transition space-y-0.5"
                  >
                    <p className="font-bold text-slate-800 truncate">
                      {sess.title}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {sess.lastMessage}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            {/* Chat Top Subheader */}
            <div className="px-4 sm:px-6 py-3 border-b border-slate-100 flex items-center justify-between bg-white/80">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-semibold">
                  Document Grounding:
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
                  <FileText className="w-3.5 h-3.5 text-indigo-600" />
                  {activeDoc?.name || "All Workspace"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearChat}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition text-xs font-medium flex items-center gap-1"
                  title="Clear conversation"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              </div>
            </div>

            {/* Chat Messages Scroll Container */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 max-w-md mx-auto">
                  <div className="w-14 h-14 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    AI Workspace Chat
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Ask questions, extract summaries, translate to Hindi, or draft emails
                    grounded in your document data.
                  </p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 group ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar matching Figma Screen 5 */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ${
                        msg.role === "user"
                          ? "bg-slate-900 text-white"
                          : "bg-sky-100 text-sky-800"
                      }`}
                    >
                      {msg.senderInitials}
                    </div>

                    {/* Bubble Content */}
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 shadow-2xs space-y-2 text-xs sm:text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-slate-900 text-white rounded-tr-xs font-medium"
                          : "bg-[#F8FAFC] border border-slate-200/80 text-slate-800 rounded-tl-xs"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] pb-1 border-b border-black/5">
                        <span className="font-bold opacity-80">
                          {msg.senderName}
                        </span>
                        <span className="text-[10px] opacity-60">
                          {msg.timestamp}
                        </span>
                      </div>

                      <p className="whitespace-pre-line">{msg.content}</p>

                      {/* Highlighted bullet points */}
                      {msg.highlightPoints && (
                        <div className="pt-2 border-t border-slate-200/80 space-y-1 text-xs">
                          {msg.highlightPoints.map((pt, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-slate-700"
                            >
                              <span className="text-indigo-600 font-bold">•</span>
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* AI Action button (copy, regenerate) */}
                      {msg.role === "assistant" && (
                        <div className="pt-2 flex items-center gap-3 text-slate-400">
                          <button
                            onClick={() => handleCopyMessage(msg.id, msg.content)}
                            className="hover:text-slate-700 flex items-center gap-1 text-[11px] transition"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span>Copy</span>
                          </button>

                          <button
                            onClick={() => handleSendMessage(msg.content)}
                            className="hover:text-slate-700 flex items-center gap-1 text-[11px] transition"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Regenerate</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center shrink-0">
                    AI
                  </div>
                  <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl px-4 py-3 flex items-center gap-1.5 text-slate-400 text-xs">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                    <span>Analyzing document content...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts Row */}
            <div className="px-4 sm:px-6 py-2.5 bg-slate-50/70 border-t border-slate-100 overflow-x-auto scrollbar-none flex items-center gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => handleSendMessage(prompt.prompt)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 shadow-2xs transition"
                >
                  {prompt.label}
                </button>
              ))}
            </div>

            {/* Input Box matching Figma "Ask or search for anything" */}
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="relative flex items-center bg-slate-100/90 rounded-full border border-slate-200 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 transition-all p-1.5 pl-5 pr-2"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask anything about this document..."
                  className="flex-1 bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none"
                />

                <button
                  type="submit"
                  disabled={!inputVal.trim() || isTyping}
                  className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-black disabled:opacity-30 disabled:pointer-events-none transition shadow-xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <FloatingMobileNav />
    </div>
  );
}

export default function WorkspacePage() {
  return (
    <ToastProvider>
      <Suspense fallback={<div className="p-8">Loading AI Workspace...</div>}>
        <WorkspaceContent />
      </Suspense>
    </ToastProvider>
  );
}
