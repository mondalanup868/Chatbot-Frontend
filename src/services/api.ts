import axios from 'axios';
import type { Message, SessionData } from '../types/chat';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 20000
});

const ABUSE_WORDS = [
  'abuse', 'abusive', 'asshole', 'bastard', 'bitch', 'bloody', 'bollocks',
  'bullshit', 'crap', 'cunt', 'damn', 'dick', 'dildo', 'fuck', 'fucker',
  'fucking', 'gay', 'goddamn', 'hell', 'idiot', 'jackass', 'jerk', 'kill',
  'killing', 'motherfucker', 'nigger', 'piss', 'prick', 'pussy', 'rape',
  'retard', 's hit', 'scumbag', 'shag', 'shat', 'shit', 'slut', 'son of a bitch',
  'tits', 'turd', 'twat', 'vagina', 'wanker', 'whore'
];

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const abusePattern = new RegExp(`\\b(?:${ABUSE_WORDS.map(escapeRegExp).join('|')})\\b`, 'i');

export const containsAbuse = (text: string): boolean => abusePattern.test(text);

export const getSessionId = (): string => {
  let session = localStorage.getItem('cipl-session');
  if (!session) {
    session = crypto.randomUUID();
    localStorage.setItem('cipl-session', session);
  }
  return session;
};

export const getSessionData = (): SessionData | null => {
  try {
    const data = localStorage.getItem('cipl-session-data');
    if (!data) return null;
    return JSON.parse(data);
  } catch {
    return null;
  }
};

export const setSessionData = (data: SessionData): void => {
  try {
    localStorage.setItem('cipl-session-data', JSON.stringify(data));
  } catch {
    // ignore storage errors
  }
};

export const incrementSessionCount = (): number => {
  const sessionData = getSessionData();
  const today = new Date().toISOString().split('T')[0];

  if (sessionData && sessionData.date === today) {
    sessionData.count += 1;
    setSessionData(sessionData);
    return sessionData.count;
  }

  const newData: SessionData = {
    sessionId: getSessionId(),
    count: 1,
    date: today
  };
  setSessionData(newData);
  return 1;
};

export const checkDailyLimit = (): { allowed: boolean; remaining: number } => {
  const sessionData = getSessionData();
  const today = new Date().toISOString().split('T')[0];

  if (!sessionData || sessionData.date !== today) {
    return { allowed: true, remaining: 10 };
  }

  const remaining = 10 - sessionData.count;
  return { allowed: remaining > 0, remaining: Math.max(0, remaining) };
};

export const sendMessage = async (message: string, sessionId: string): Promise<{ reply: string; suggestions?: string[]; limitReached?: boolean; remaining?: number }> => {
  const response = await api.post('/api/chat', { message, sessionId });
  return response.data;
};

export const getHealth = async (): Promise<{ success: boolean; service: string }> => {
  const response = await api.get('/health');
  return response.data;
};

export const getLimit = async (sessionId: string): Promise<{ success: boolean; limit: number; remaining: number }> => {
  const response = await api.get('/api/limit', { params: { sessionId } });
  return response.data;
};

export const saveHistory = (messages: Message[]): void => {
  try {
    localStorage.setItem('cipl-chat-history', JSON.stringify(messages));
  } catch {
    // ignore storage errors
  }
};

export const loadHistory = (): Message[] => {
  try {
    const data = localStorage.getItem('cipl-chat-history');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const clearHistory = (): void => {
  try {
    localStorage.removeItem('cipl-chat-history');
  } catch {
    // ignore storage errors
  }
};
