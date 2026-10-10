import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaTrash, FaBolt, FaShieldAlt } from 'react-icons/fa';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import ContactSales from './ContactSales';
import { Message } from '../types/chat';
import { sendMessage, saveHistory, loadHistory, clearHistory, getHealth, getSessionId, checkDailyLimit, containsAbuse, getLimit } from '../services/api';

const SUGGESTED_QUESTIONS = [
  'Tell me about Software Development',
  'Tell me about Online Exam',
  'Tell me about Laptop & Tab Rental',
  'Tell me about CCTV Service'
];

const CAPABILITIES = [
  'Software Development',
  'Online Exam',
  'Laptop & Tab Rental',
  'CCTV Service'
];

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDark] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [limitReached, setLimitReached] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [sessionId, setSessionId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const init = async () => {
      const sid = getSessionId();
      setSessionId(sid);
      const limit = checkDailyLimit();
      setLimitReached(!limit.allowed);
      const saved = loadHistory();
      if (saved.length > 0) {
        setMessages(saved);
      }
      try {
        const health = await getHealth();
        setIsOnline(health.success);
      } catch {
        setIsOnline(false);
      }
      try {
        const limitData = await getLimit(sid);
        setRemaining(limitData.remaining);
      } catch {
        // badge stays hidden until a response arrives
      }
    };
    init();
  }, []);

  const handleSend = async (content: string) => {
    if (!content.trim() || isLoading || limitReached) return;

    if (containsAbuse(content)) {
      const abuseMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'I am here to assist you with CIPL services. Please let me know how I can help.',
        timestamp: Date.now(),
        suggestions: ['What services does CIPL provide?', 'Tell me about AI solutions', 'Book a demo']
      };
      setMessages(prev => {
        const next = [...prev, abuseMessage];
        saveHistory(next);
        return next;
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: Date.now()
    };
    setMessages(prev => {
      const next = [...prev, userMessage];
      saveHistory(next);
      return next;
    });
    setIsLoading(true);

    try {
      const data = await sendMessage(content, sessionId || getSessionId());
      if (data.limitReached) {
        setLimitReached(true);
      }
      if (typeof data.remaining === 'number') {
        setRemaining(data.remaining);
      } else {
        setRemaining(prev => (prev === null ? prev : Math.max(0, prev - 1)));
      }
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'Sorry, I could not generate a response.',
        timestamp: Date.now(),
        suggestions: data.suggestions
      };
      setMessages(prev => {
        const next = [...prev, assistantMessage];
        saveHistory(next);
        return next;
      });
    } catch (error) {
      const apiError = error as {
        response?: { status?: number; data?: { message?: string; limitReached?: boolean } };
      };
      const isLimitError = apiError.response?.status === 429 || apiError.response?.data?.limitReached;
      if (isLimitError) {
        setLimitReached(true);
        setRemaining(0);
        return;
      }
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          apiError.response?.data?.message ||
          'Something went wrong on our side. Please try again, or contact our team at +91 9876543210 / support@example.com.',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      textareaRef.current?.focus();
    }
  };

  const handleClear = () => {
    clearHistory();
    setMessages([]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  const chatsLeft = limitReached ? 0 : remaining;

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans sm:bottom-7 sm:right-7 dark">
      {isOpen ? (
        <div className="flex h-[600px] max-h-[calc(100dvh_-_2.5rem)] w-[400px] max-w-[calc(100vw_-_2.5rem)] flex-col overflow-hidden rounded-[24px] border border-slate-700 bg-slate-900 text-slate-100 shadow-panel animate-fade-up sm:max-h-[calc(100dvh_-_3rem)] sm:max-w-[calc(100vw_-_3rem)]">
          {/* Header */}
          <div className="border-b border-slate-700 bg-blue-700">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 border border-blue-400">
                    <FaRobot className="text-lg text-white" />
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-blue-700 ${isOnline ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-display text-[15px] font-bold tracking-tight text-white">
                      CIPL Assistant
                    </h2>
                    <span className="rounded-md bg-blue-600 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white border border-blue-400">
                      AI
                    </span>
                  </div>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-blue-100">
                    <span className={`h-1.5 w-1.5 rounded-full ${isOnline ? 'animate-pulse bg-emerald-300' : 'bg-rose-300'}`} />
                    {isOnline ? 'Online · replies instantly' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex flex-shrink-0 flex-col items-end gap-1.5">
                <div className="flex items-center gap-1">
                  <button onClick={handleClear} className="rounded-xl p-2 text-blue-100/70 transition-colors hover:bg-blue-600 hover:text-white" title="Clear chat">
                    <FaTrash className="text-sm" />
                  </button>
                  <button onClick={() => setIsOpen(false)} className="rounded-xl p-2 text-blue-100/70 transition-colors hover:bg-blue-600 hover:text-white" title="Close">
                    <FaTimes className="text-sm" />
                  </button>
                </div>
                {typeof chatsLeft === 'number' && (
                  <span className="flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-semibold text-white border border-blue-500">
                    <FaBolt className="text-[8px]" />
                    {chatsLeft} left today
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-slate-900 p-5">
            {messages.length === 0 && !limitReached && (
              <div className="animate-fade-up flex h-full flex-col items-center justify-center py-2 text-center">
                <h3 className="mb-1 font-display text-[16px] font-bold tracking-tight text-white">
                  Welcome to CIPL AI Assistant
                </h3>
                <p className="mx-auto mb-3.5 max-w-[290px] text-[12px] leading-snug text-slate-400">
                  Your guide to CIPL services. Pick a topic:
                </p>
                <div className="mx-auto mb-3 grid w-full max-w-[300px] grid-cols-2 gap-1.5">
                  {CAPABILITIES.map((item, i) => (
                    <button
                      key={item}
                      onClick={() => handleSuggestionClick(`Tell me about ${item}`)}
                      className="flex animate-fade-up items-center gap-1.5 rounded-lg bg-slate-800 px-2.5 py-2 text-left text-[11px] font-medium text-slate-300 border border-slate-700 transition-colors hover:border-blue-500 hover:text-white"
                      style={{ animationDelay: `${i * 70}ms` }}
                    >
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                      <span className="truncate">{item}</span>
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {SUGGESTED_QUESTIONS.map((question) => (
                    <button
                      key={question}
                      onClick={() => handleSuggestionClick(question)}
                      className="rounded-full bg-blue-600/15 px-3 py-1 text-[10.5px] font-medium text-blue-300 border border-blue-600/40 transition-colors hover:bg-blue-600 hover:text-white"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.length > 0 && messages.map(message => (
              <ChatMessage key={message.id} message={message} isDark={isDark} onSuggestionClick={handleSuggestionClick} />
            ))}
            {isLoading && <TypingIndicator isDark={isDark} />}
            {limitReached && (
              <div className="pt-2">
                <ContactSales isDark={isDark} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {!limitReached && (
            <div className="border-t border-slate-700 bg-slate-800 px-4 pb-4 pt-3.5">
              <ChatInput onSend={handleSend} isLoading={isLoading} isDark={isDark} textareaRef={textareaRef} />
              <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[10px] tracking-wide text-slate-500">
                <FaShieldAlt className="text-[9px] text-blue-400" />
                Secured &amp; confidential · Powered by CIPL
              </p>
            </div>
          )}
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="group relative flex items-center justify-center" title="Chat with CIPL AI">
          <span className="absolute h-16 w-16 animate-ring-pulse rounded-full bg-blue-600/40" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white transition-transform group-hover:scale-105 group-active:scale-95">
            <FaRobot className="text-2xl transition-transform group-hover:rotate-6" />
          </span>
        </button>
      )}
    </div>
  );
}

export default ChatWidget;
