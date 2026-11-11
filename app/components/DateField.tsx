
type DateFieldProps = {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  // ...
};

export function DateField({ label, error, ...props }: DateFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-600 mb-1 block">{label}</label>
      <div className="relative group">
        <input
          className="text-base p-2.5 block w-full flex-1 rounded-md border border-gray-300 bg-white
                   outline-none shadow-sm transition-colors
                   focus:border-sber-green focus:ring-2 focus:ring-sber-green"
          {...props} 
        />

        {/* «кнопка» с иконкой календаря */}
        <div className="
            pointer-events-none absolute inset-y-0 right-0 flex w-[46px] items-center 
            justify-center rounded-r-md border-l border-gray-300 bg-sber-green">
          <svg className="h-5 w-5 text-white transition-colors group-hover:text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M8 3v4M16 3v4M3 10h18" />
          </svg>
        </div>
        
        {error && (
            <div className="absolute bottom-full left-0 z-10 mb-2 px-3 py-2 bg-red-500 text-white text-sm rounded-lg shadow-lg whitespace-nowrap">
            {error}
            <div className="absolute top-full left-4 -mt-2 w-3 h-3 bg-red-500 rotate-45"></div>
          </div>
        )}

      </div>
    </div>
  );
}