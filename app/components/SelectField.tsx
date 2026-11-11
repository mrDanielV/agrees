type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  label: string;
  options: SelectOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  // ...
};

export function SelectField({ label, options, error, ...props }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-600 mb-1 block">{label}</label>
      <div className="relative group">
        <select 
          className="
              text-base appearance-none py-2 pl-2.5 pr-10 block w-full rounded-md border border-gray-300 bg-white 
              focus:border-sber-green focus:ring-2 focus:ring-sber-green outline-none cursor-pointer"
          {...props}
        >
          {options.map((opt) => (
            <option
              className="py-15" 
              key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {/* условно-квадратная «кнопка» со своей иконкой */}
        <div className="
            pointer-events-none absolute inset-y-0 right-0 flex w-[44px] items-center 
            justify-center border-l border-gray-300">
          <svg className="h-6 w-6 text-gray-500 transition-colors group-hover:text-sber-green" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
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