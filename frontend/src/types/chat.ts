export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
}

export interface ChatResponse {
  response: string;
}

export interface Conversation {
  id: number;
  title: string;
  messages: ChatMessage[];
} 