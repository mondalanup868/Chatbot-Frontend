export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  suggestions?: string[];
}

export interface SessionData {
  sessionId: string;
  count: number;
  date: string;
}
