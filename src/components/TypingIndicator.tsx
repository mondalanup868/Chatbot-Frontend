import { FaRobot } from 'react-icons/fa';

function TypingIndicator({ isDark }: { isDark: boolean }) {
  void isDark;
  return (
    <div className="flex items-end gap-2.5 animate-fadeIn">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600">
        <FaRobot className="text-[11px] text-white" />
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-slate-700 px-4 py-3.5">
        {[0, 160, 320].map(delay => (
          <span
            key={delay}
            className="h-1.5 w-1.5 animate-typing-dot rounded-full bg-blue-400"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export default TypingIndicator;
