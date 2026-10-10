import { FaUser, FaRobot } from 'react-icons/fa';

function ChatMessage({ message, isDark, onSuggestionClick }: { message: { id: string; role: string; content: string; timestamp: number; suggestions?: string[] }; isDark: boolean; onSuggestionClick?: (suggestion: string) => void }) {
  void isDark;
  const isUser = message.role === 'user';
  const time = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex flex-col animate-fadeIn ${isUser ? 'items-end' : 'items-start'}`}>
      <div className={`flex items-end gap-2.5 max-w-[88%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-slate-600' : 'bg-blue-600'}`}>
          {isUser ? <FaUser className="text-white text-[11px]" /> : <FaRobot className="text-white text-[11px]" />}
        </div>
        <div className="flex flex-col">
          <div className={`px-4 py-2.5 rounded-2xl text-[13.5px] leading-relaxed break-words whitespace-pre-line ${isUser ? 'bg-blue-600 text-white rounded-br-md' : 'bg-slate-700 text-slate-100 rounded-bl-md'}`}>
            {message.content}
          </div>
          <span className={`text-[10px] mt-1.5 px-0.5 tabular-nums text-slate-400 ${isUser ? 'self-end' : 'self-start'}`}>
            {time}
          </span>
        </div>
      </div>
      {!isUser && message.suggestions && message.suggestions.length > 0 && onSuggestionClick && (
        <div className="flex flex-wrap gap-2 mt-2.5 ml-10.5">
          {message.suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              className="px-3.5 py-1.5 rounded-full text-[11.5px] font-medium tracking-wide transition-colors duration-200 text-blue-300 bg-blue-600/15 border border-blue-600/40 hover:bg-blue-600 hover:text-white"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatMessage;
