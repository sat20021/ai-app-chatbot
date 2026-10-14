import { DocumentItem, ActivityItem } from "@/types/document";
import { ChatMessage, ConversationSession, PromptTemplate } from "@/types/chat";

export const MOCK_DOCUMENTS: DocumentItem[] = [
  {
    id: "doc-receipt-01",
    name: "New York Grocery Receipt.jpg",
    fileType: "image",
    size: 245000,
    updatedAt: "2024-01-21T14:14:00Z",
    status: "ready",
    category: "Receipts",
    pageCount: 1,
    tags: ["Receipt", "Groceries", "Tax Deductible"],
    isFavorite: true,
    summary: "Receipt from New York Grocery totaling $29.58. Items include Bread ($3.25), Milk ($3.80), Eggs ($5.50), Apples ($4.25), and Preserves ($3.50).",
    extractedText: `NEW YORK GROCERY
144 W 23rd St, New York, NY 10011
Jan 21, 2024, 2:14 PM

ITEMS:
Bread          $3.25
Eggs           $5.50
Milk           $3.80
Apples         $4.25
Preserves      $3.50
Yeast Extract  $5.45

Subtotal       $25.75
Tax (8.875%)    $2.28
Tip/Other       $1.55
-----------------------
TOTAL          $29.58

Card: Visa ending 4082
Thank you for shopping with us!`
  },
  {
    id: "doc-report-02",
    name: "Annual Report 2025.pdf",
    fileType: "pdf",
    size: 4820000,
    updatedAt: "2025-01-15T09:30:00Z",
    status: "ready",
    category: "Reports",
    pageCount: 42,
    tags: ["Executive", "Financials", "FY2025"],
    isFavorite: true,
    summary: "Comprehensive 2025 financial overview showing 34% YoY revenue growth, ARR of $48.2M, expansion in APAC and EMEA, and AI workspace workflow adoption up 180%.",
    extractedText: `UNIVERSAL ENTERPRISE CORP
ANNUAL PERFORMANCE REPORT FY2025

1. Executive Summary
During FY2025, the company achieved milestone gross revenue of $48.2M (+34% YoY). Key drivers included cloud document infrastructure, enterprise AI workspace subscriptions, and automated OCR processing workflows.

2. Key Financial Highlights:
- Annual Recurring Revenue: $48.2M
- Gross Margin: 78.4%
- Customer Retention Rate: 96.2%
- Research & AI Development: $12.1M (25% of expenditure)

3. Forward Guidance:
Forecasted FY2026 growth target set at 40%, with key investments in localized edge document models and cross-border document compliance.`
  },
  {
    id: "doc-proposal-03",
    name: "Project Proposal - AI Integration.docx",
    fileType: "docx",
    size: 1120000,
    updatedAt: "2024-03-02T16:45:00Z",
    status: "ready",
    category: "Contracts",
    pageCount: 14,
    tags: ["Proposal", "Client", "AI"],
    summary: "Implementation plan for integrating intelligent document scanning, automated summarization, and vector retrieval into enterprise client portals within 8 weeks.",
    extractedText: `PROJECT CHARTER: ENTERPRISE AI DOCUMENT WORKSPACE
Prepared for: Apex Global Partners
Prepared by: Solutions Architecture Team

Phase 1: Discovery & OCR Pipeline (Weeks 1-2)
Phase 2: Semantic Document Indexing & Embeddings (Weeks 3-4)
Phase 3: Interactive Document Chat & Smart Summaries (Weeks 5-6)
Phase 4: Compliance, Security Audit & Production Rollout (Weeks 7-8)`
  },
  {
    id: "doc-sales-04",
    name: "Sales Data Q3 & Forecast.xlsx",
    fileType: "xlsx",
    size: 3450000,
    updatedAt: "2024-02-18T11:20:00Z",
    status: "ready",
    category: "Finance",
    pageCount: 6,
    tags: ["Sales", "Spreadsheet", "Forecast"],
    summary: "Regional sales breakdown for North America, EMEA, and APAC. Exceeded Q3 quota by 18.4% driven by higher enterprise tier expansions.",
    extractedText: `REGION\tQ1 ACTUAL\tQ2 ACTUAL\tQ3 ACTUAL\tQ4 TARGET
North America\t$4,200,000\t$4,800,000\t$5,400,000\t$6,100,000
EMEA\t$2,900,000\t$3,250,000\t$3,700,000\t$4,150,000
APAC\t$1,400,000\t$1,850,000\t$2,300,000\t$2,800,000
LATAM\t$650,000\t$720,000\t$890,000\t$1,050,000
TOTAL\t$9,150,000\t$10,620,000\t$12,290,000\t$14,100,000`
  },
  {
    id: "doc-deck-05",
    name: "Product Presentation 2025.pptx",
    fileType: "pptx",
    size: 15400000,
    updatedAt: "2024-03-10T14:00:00Z",
    status: "ready",
    category: "Reports",
    pageCount: 22,
    tags: ["SlideDeck", "Product", "Pitch"],
    summary: "Keynote presentation detailing the 2025 Universal Document Hub architecture, intelligent scanner capabilities, and multi-format conversions.",
    extractedText: `Slide 1: Universal Document Hub — Every Document, One Intelligent Workspace
Slide 2: The Problem: Fragmentation across PDFs, spreadsheets, and paper receipts
Slide 3: The Solution: Instant OCR, Document Grounded AI, Real-time Conversions
Slide 4: Architecture Overview: Next.js + FastAPI + Local/Cloud LLM
Slide 5: Roadmap & Milestones`
  },
  {
    id: "doc-meeting-06",
    name: "Executive Meeting Notes.pdf",
    fileType: "pdf",
    size: 890000,
    updatedAt: "2024-03-12T17:15:00Z",
    status: "ready",
    category: "General",
    pageCount: 3,
    tags: ["Notes", "ActionItems", "Internal"],
    summary: "Notes from product sync. Action items: finalize scanner mobile UI, add format conversion pipeline, and prepare API schemas for FastAPI integration.",
    extractedText: `EXECUTIVE PRODUCT SYNC — MARCH 12
Attendees: Peter (PM), Sarah (Lead Designer), Alex (Senior Engineer)

Key Discussion Points:
1. Mobile-first document hub with pastel format cards
2. Seamless AI Workspace chat supporting side-by-side document query
3. Fast client-side image enhancement for Smart Scanner

Action Items:
• Set the presentation format for client review
• Email the quarterly report to finance
• Distribute bug bounty guidelines to security auditors`
  }
];

export const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: "act-1",
    action: "scanned",
    documentName: "New York Grocery Receipt.jpg",
    timestamp: "10 minutes ago",
    documentId: "doc-receipt-01",
  },
  {
    id: "act-2",
    action: "queried",
    documentName: "Annual Report 2025.pdf",
    timestamp: "1 hour ago",
    documentId: "doc-report-02",
  },
  {
    id: "act-3",
    action: "uploaded",
    documentName: "Sales Data Q3 & Forecast.xlsx",
    timestamp: "3 hours ago",
    documentId: "doc-sales-04",
  },
  {
    id: "act-4",
    action: "converted",
    documentName: "Executive Meeting Notes.pdf",
    timestamp: "Yesterday",
    documentId: "doc-meeting-06",
  },
];

export const MOCK_CONVERSATION_SESSIONS: ConversationSession[] = [
  {
    id: "session-receipt",
    title: "Grocery Receipt Breakdown",
    lastMessage: "Total expense is $29.58 across 6 grocery items.",
    updatedAt: "Just now",
    documentId: "doc-receipt-01",
    documentName: "New York Grocery Receipt.jpg",
  },
  {
    id: "session-report",
    title: "FY2025 Revenue Analysis",
    lastMessage: "ARR increased by 34% YoY to $48.2M.",
    updatedAt: "2 hours ago",
    documentId: "doc-report-02",
    documentName: "Annual Report 2025.pdf",
  },
  {
    id: "session-meeting",
    title: "Action Items from Sync",
    lastMessage: "Found 3 assigned action items for Peter & team.",
    updatedAt: "Yesterday",
    documentId: "doc-meeting-06",
    documentName: "Executive Meeting Notes.pdf",
  },
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    role: "user",
    senderName: "Peter",
    senderInitials: "P",
    content: "Can you summarize the text in the document?",
    timestamp: "9:41 AM",
    documentRef: {
      id: "doc-receipt-01",
      name: "New York Grocery Receipt.jpg",
    },
  },
  {
    id: "msg-2",
    role: "assistant",
    senderName: "AI Assistant",
    senderInitials: "AI",
    content: "Sure! The receipt is for groceries from New York Grocery (144 W 23rd St). It contains 6 items including Bread, Eggs, Milk, Apples, Preserves, and Yeast Extract.",
    timestamp: "9:41 AM",
    highlightPoints: [
      "Subtotal: $25.75 | Tax: $2.28",
      "Total Amount: $29.58 paid via Visa",
      "Category: Food & Dining / Household Expense",
    ],
  },
  {
    id: "msg-3",
    role: "user",
    senderName: "Peter",
    senderInitials: "P",
    content: "Can you analyze our meeting notes and list the key action items?",
    timestamp: "9:42 AM",
    documentRef: {
      id: "doc-meeting-06",
      name: "Executive Meeting Notes.pdf",
    },
  },
  {
    id: "msg-4",
    role: "assistant",
    senderName: "AI Assistant",
    senderInitials: "AI",
    content: "Here are the extracted action items from the Executive Product Sync:",
    timestamp: "9:42 AM",
    highlightPoints: [
      "Set the presentation format for client review",
      "Email the quarterly report to finance team",
      "Distribute bug bounty guidelines to security auditors",
    ],
  },
];

export const SUGGESTED_PROMPTS: PromptTemplate[] = [
  {
    id: "p1",
    label: "Summarize this document",
    prompt: "Provide an executive summary of the document with key takeaways.",
    iconName: "FileText",
  },
  {
    id: "p2",
    label: "What are the key findings?",
    prompt: "Extract the core conclusions, numbers, and metrics highlighted in this file.",
    iconName: "TrendingUp",
  },
  {
    id: "p3",
    label: "Extract important dates",
    prompt: "List all deadlines, event dates, and milestones found in this document.",
    iconName: "Calendar",
  },
  {
    id: "p4",
    label: "Explain in simple English",
    prompt: "Explain this document in simple, plain English without heavy jargon.",
    iconName: "Sparkles",
  },
  {
    id: "p5",
    label: "Translate to Hindi",
    prompt: "इस दस्तावेज़ का मुख्य सारांश हिंदी में अनुवाद करें। (Translate the main summary into Hindi).",
    iconName: "Languages",
  },
  {
    id: "p6",
    label: "List the action items",
    prompt: "List all actionable tasks, assigned owners, and next steps as bullet points.",
    iconName: "CheckSquare",
  },
];
