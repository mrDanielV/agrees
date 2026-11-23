import { IMaskInput } from 'react-imask';
import { useState } from "react";

type MaskedFieldProps = {
  label?: string;
  mask: string; // Например, "0000"
  value?: string;
  placeholder?:string;
  pchar?:string;
  onChange?: (value: string) => void;
  error?: string;
};

export function MaskedField({ label, mask, placeholder, pchar, value, onChange, error }: MaskedFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-600 mb-1 block">{label}</label>
      <div className="relative">
        <IMaskInput
          mask={mask}
          value={value || ''}
          onAccept={(val) => onChange?.(val)} // Передаем отформатированное значение
          lazy={!isFocused}
          placeholder={isFocused ? '' : (placeholder || '')}
          placeholderChar={pchar}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="text-base p-2.5 block w-full flex-1 rounded-md border border-gray-300 bg-white
                   outline-none shadow-sm transition-colors
                   focus:border-sber-green focus:ring-2 focus:ring-sber-green
                   "
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