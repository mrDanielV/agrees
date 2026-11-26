
import { useState, useEffect, useRef } from "react";
import { IMaskInput } from 'react-imask';
import { DayPickerCmp } from '../components/DayPickerCmp'
import { parse } from 'date-fns';

type DateFieldProps = {
  label: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  error?: string;
  // ...
};

export function DateField({ label, value, placeholder, onChange, error, ...props }: DateFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Преобразование строки (из формы) в Date (для календаря)
  const selectedDate = value ? parse(value, 'dd.MM.yyyy', new Date()) : undefined;
  
  // Установка даты их пикера в input (IMaskInput)
  const handleSelect = (date: Date | undefined) => {
    if (date) {
      const formatted = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      onChange?.(formatted);
    }
    setIsOpen(false);
  };

  // Закрываем пикер при потере фокуса
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-1" ref={containerRef}>
      <label className="text-gray-600 mb-1 block">{label}</label>
      <div className="relative group">
        <IMaskInput
          mask='00.00.0000'
          value={value || ''}
          lazy={!isFocused}
          placeholder={isFocused ? '' : (placeholder || '')}
          placeholderChar="_"
          onClick={() => setIsOpen(!isOpen)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onAccept={(val) => onChange?.(val)} // Передаем отформатированное значение
          className="text-base p-2.5 block w-full flex-1 rounded-md border border-gray-300 bg-white
                   outline-none shadow-sm transition-colors
                   focus:border-sber-green focus:ring-2 focus:ring-sber-green
                   "
        />

        {/* «кнопка» с иконкой календаря */}
        <div className="
              cursor-pointer absolute inset-y-0 right-0 flex w-[46px] items-center 
              justify-center rounded-r-md border-l border-gray-300 bg-sber-green"
            onClick={(e) => {
              e.stopPropagation(); // <-- чтобы клик не уходил на инпут
              setIsOpen(!isOpen);
            }}
          >
          <svg className="h-5 w-5 text-white transition-colors group-hover:text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M8 3v4M16 3v4M3 10h18" />
          </svg>
        </div>

        {/* пикер */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 z-20 bg-white rounded-lg shadow-xl p-2 border border-gray-300">
            <DayPickerCmp onSelect={handleSelect} selected={selectedDate}/>
          </div>
        )}
        
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