export type FileType =
  | "pdf"
  | "docx"
  | "doc"
  | "xlsx"
  | "xls"
  | "pptx"
  | "ppt"
  | "image"
  | "txt";

export type ProcessingStatus = "ready" | "processing" | "indexed" | "failed";

export interface DocumentItem {
  id: string;
  name: string;
  fileType: FileType;
  size: number; // in bytes
  updatedAt: string;
  status: ProcessingStatus;
  category: "Finance" | "Reports" | "Contracts" | "Personal" | "Receipts" | "General";
  pageCount?: number;
  tags?: string[];
  thumbnailUrl?: string;
  summary?: string;
  extractedText?: string;
  isFavorite?: boolean;
}

export interface ActivityItem {
  id: string;
  action: "uploaded" | "scanned" | "queried" | "converted" | "shared";
  documentName: string;
  timestamp: string;
  documentId?: string;
}

export interface DocumentFilterOptions {
  searchQuery: string;
  fileType: string;
  category: string;
  sortBy: "date" | "name" | "size";
  sortOrder: "asc" | "desc";
  viewMode: "grid" | "list";
}
