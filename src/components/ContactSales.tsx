import { FaPhone, FaArrowRight } from 'react-icons/fa';

function ContactSales({ isDark }: { isDark: boolean }) {
  void isDark;
  return (
    <div className="px-1 py-3 text-center animate-fade-up">
      <p className="mx-auto max-w-[30ch] text-balance text-[13.5px] leading-relaxed text-slate-200 sm:text-[14px]">
        For more enquiry, contact on{' '}
        <a href="tel:+914545454545" className="whitespace-nowrap font-semibold text-blue-400">
          +91 4545454545
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
      <p className="mt-2.5 text-[10.5px] text-slate-500">
        or call us directly at{' '}
        <a href="tel:+914545454545" className="inline-flex items-center gap-1 font-medium text-blue-400">
          <FaPhone className="text-[9px]" />
          +91 4545454545
        </a>
      </p>
    </div>
  );
}

export default ContactSales;
