# Universal Document Hub — AI Workspace

> **"Every Document. One Intelligent Workspace."**  
> A minimal, modern, responsive frontend application for intelligent document management, instant OCR scanning, multi-format conversion, and document-grounded AI workspace interactions. Built faithfully based on the Figma reference designs.

---

## 📸 Design Language & Visual System

Recreated from the Figma specifications:
- **Palette**: Soft off-white backgrounds (`#F8FAFC`), crisp white cards with soft borders (`#E2E8F0`), and distinctive pastel action cards matching Figma screen 1 & 2:
  - 🔵 **Pastel Sky**: Scan Document & PDF cards (`#E0F2FE`)
  - 🟣 **Pastel Lavender**: Upload Photo & Word cards (`#F3E8FF` / `#EDE9FE`)
  - 🟢 **Pastel Mint**: Excel Spreadsheets (`#DCFCE7`)
  - 🟡 **Pastel Cream / Yellow**: Create Blank Doc card (`#FEF3C7`)
  - 🟠 **Pastel Coral / Peach**: Action pills & PowerPoint cards
- **Iconic Mobile Floating Bar**: Sleek black pill navigation with white rounded icons (Hub, AI Sparkles, Quick Camera Scan, Convert, Settings).
- **Typography**: Clean, geometric sans-serif with tight tracking and balanced whitespace.

---

## 🚀 Completed Pages & Routes

| Route | Page | Key Features |
|---|---|---|
| `/` | **Landing Page** | Hero section, interactive preview, 4 feature pillars (Universal Hub, AI Workspace, Smart Scanner, Convert & Optimize), How it Works, Footer |
| `/dashboard` | **Main Dashboard** | Greeting, overview metrics (Total Documents, Recently Opened, Processed, Demo Storage), Figma Pastel Action Grid, recent document cards, activity stream |
| `/documents` | **Universal Document Hub** | Document catalog, format filters (PDF, Word, Excel, PPT, Images, Receipts), sort by date/name/size, grid/list view toggle, drag-and-drop file upload modal |
| `/documents/[id]` | **Document Viewer** | 3-column workspace: left document list/meta, center preview with Figma Screen 4 action pill row (Recognize text, Copy, Share, Hide, Formatting toolbar), right AI Assistant & OCR text |
| `/workspace` | **AI Workspace** | Figma Screen 5 chat interface, document context switcher, suggested prompt chips (Summarize, Key findings, Hindi translation, Action items), message copy/regenerate |
| `/scanner` | **Smart Scanner** | Device camera integration (permission requested only on click), local image upload, image rotation, brightness/contrast adjustments, instant OCR recognition, copy & download |
| `/convert` | **Convert & Optimize** | Format conversion pipeline, source file selector, target format picker (PDF, TXT, CSV), real client-side download generation, transparent "Coming soon" tags for server conversions |
| `/settings` | **Settings & Privacy** | Profile configuration, AI behavior toggles, multilingual support (English, Hindi, Spanish, French, German), transparent data privacy disclosures, session data reset dialog |

---

## 🛠 Implemented Interactions

- **Responsive Multi-Device Layout**: Fully adaptive desktop sidebar + top bar, and mobile layout with floating pill navigation bar.
- **Drag-and-Drop File Upload**: Reusable upload modal with drag-and-drop, extension validation, size limit checks, upload progress simulation, and in-memory document state.
- **Full Search & Filter Engine**: Instant search across filenames, tags, summaries, and categories, combined with file type filters and sorting.
- **Context-Aware AI Chat**: Document-grounded responses that adapt based on the selected document (e.g. itemizing the New York Grocery receipt totals vs. reporting Annual Report ARR growth).
- **Live Device Camera Access**: Requests webcam permission only when user clicks "Open Camera", captures photo frames to canvas, and handles denial gracefully.
- **Image Adjustments**: 90-degree image rotations, brightness sliders, and contrast enhancement filters for document clarity.
- **Copy to Clipboard & Toast System**: Global toast notification system with interactive feedback for copy actions, uploads, deletes, and conversions.
- **Grid / List View Switcher**: Dynamic layout toggle for all document lists.
- **Safe Confirmation Dialogs**: Custom confirmation modals for destructive document deletions and session resets.

---

## 🔍 Distinction: Functional vs. Simulated Features

To ensure transparency and compliance with guidelines:

| Feature | Current Frontend Implementation | Next Phase (Production Backend) |
|---|---|---|
| **File Storage** | Kept in browser session memory; no external uploads | S3 / Cloudflare R2 / MinIO with pre-signed URLs |
| **OCR Processing** | Simulated high-accuracy text extraction on sample receipt & user files | Tesseract.js / AWS Textract / Google Cloud Document AI |
| **AI Workspace Chat** | Fast client-side rule & template based contextual responses | FastAPI backend streaming responses from Gemini 2.0 / OpenAI / Claude |
| **File Conversion** | Generates real client-side text/PDF/CSV file representations for download | Headless LibreOffice / WeasyPrint / Pandoc via backend worker |
| **Authentication** | Demo guest profile (Peter Anderson) | JWT / OAuth2 / NextAuth / Supabase Auth |

---

## 📦 Installation & Setup

### Prerequisites
- Node.js `v18.0.0` or higher (`v20+` or `v22+` recommended)
- npm, pnpm, or yarn

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in your browser
# Navigate to http://localhost:3000
```

### Production Build
```bash
npm run build
npm run start
```

---

## 🗺️ Next Phase: Backend & AI Integration Plan

When you are ready to connect a real backend, follow this recommended architectural plan:

### 1. Backend Service (FastAPI)
- Build a Python FastAPI service (`/backend`) with endpoints:
  - `POST /api/documents/upload`: Multi-part upload with streaming to S3/R2 storage.
  - `POST /api/documents/ocr`: Asynchronous OCR parsing using Celery or background tasks.
  - `POST /api/chat`: Server-sent events (SSE) streaming chat endpoint connecting LangChain or LlamaIndex with vector search (Chroma / Pgvector).
  - `POST /api/convert`: Format conversion worker running unoconv or pdfkit.

### 2. Database Schema (PostgreSQL / SQLite with Prisma or SQLAlchemy)
- `users`: ID, email, name, plan_tier, created_at.
- `documents`: ID, user_id, file_name, file_url, file_size, mime_type, ocr_text, vector_status.
- `chat_sessions`: ID, user_id, document_id, title, created_at.
- `chat_messages`: ID, session_id, role, content, metadata_json.

### 3. Frontend Connection
- Replace the mock responses in `app/workspace/page.tsx` with an `EventSource` or `fetch` call to the streaming SSE endpoint:
  ```typescript
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: inputVal, documentId: selectedDocId })
  });
  ```
