export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  senderName: string;
  senderInitials: string;
  content: string;
  timestamp: string;
  documentRef?: {
    id: string;
    name: string;
  };
  highlightPoints?: string[];
  isTyping?: boolean;
}

export interface ConversationSession {
  id: string;
  title: string;
  lastMessage: string;
  updatedAt: string;
  documentId?: string;
  documentName?: string;
}

export interface PromptTemplate {
  id: string;
  label: string;
  prompt: string;
  iconName: string;
}
