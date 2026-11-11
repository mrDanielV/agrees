type TextFieldProps = {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  // ...
};

export function TextField({ label, error, ...props }: TextFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-600 mb-1 block">{label}</label>
      <div className="relative">
        <input
          className="text-base p-2.5 block w-full flex-1 rounded-md border border-gray-300 bg-white
                   outline-none shadow-sm transition-colors
                   focus:border-sber-green focus:ring-2 focus:ring-sber-green"
          {...props} 
        />
        
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