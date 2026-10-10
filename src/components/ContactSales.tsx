import { FaPhone, FaArrowRight } from 'react-icons/fa';

function ContactSales({ isDark }: { isDark: boolean }) {
  void isDark;
  return (
    <div className="px-1 py-3 text-center animate-fade-up">
      <p className="mx-auto max-w-[30ch] text-balance text-[13.5px] leading-relaxed text-slate-200 sm:text-[14px]">
        For more enquiry, contact on{' '}
        <a href="tel:+911142467305" className="whitespace-nowrap font-semibold text-blue-400">
          +91 1142467305
        </a>
      </p>
      <a
        href="https://cipl.ai/contact"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto mt-3 flex min-h-[46px] w-full max-w-xs touch-manipulation items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-blue-500 active:scale-[0.98]"
      >
        Contact Us Page
        <FaArrowRight className="text-[11px] opacity-80" />
      </a>
    </div>
  );
}

export default ContactSales;
