import { useState, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

function ChatInput({ onSend, isLoading, isDark, textareaRef }: { onSend: (content: string) => void; isLoading: boolean; isDark: boolean; textareaRef: React.RefObject<HTMLTextAreaElement | null> }) {
  const [value, setValue] = useState('');
  void isDark;

  const handleSubmit = () => {
    if (!value.trim() || isLoading) return;
    onSend(value);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [value, textareaRef]);

  return (
    <div className="flex items-end gap-2.5">
      <div className="flex flex-1 items-center rounded-2xl bg-slate-800 px-4 border border-slate-700 focus-within:border-blue-500">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about CIPL…"
          rows={1}
          disabled={isLoading}
          className="w-full resize-none bg-transparent py-3 text-[13.5px] leading-snug text-slate-100 outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={isLoading || !value.trim()}
        className="flex-shrink-0 rounded-2xl bg-blue-600 p-3 text-white transition-colors duration-200 hover:bg-blue-500 disabled:opacity-40"
        title="Send message"
      >
        <FaPaperPlane className="text-sm" />
      </button>
    </div>
  );
}

export default ChatInput;
