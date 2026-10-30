'use client';

import { useEffect, useRef, useState } from 'react';

const DURATION = 2000;

type ToastProps = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

export function Toast({ message, type, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(false);
    const onCloseRef = useRef(onClose);

    useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

    useEffect(() => {
        // 1) сначала монтируем без анимации
        const enter = requestAnimationFrame(() => setIsVisible(true));

        // 2) через duration — начинаем уход
        const hideTimer = setTimeout(() => setIsVisible(false), DURATION);

        // 3) после анимации ухода — размонтируем через родителя
        const closeTimer = setTimeout(onClose, DURATION + 300); // 300 = длительность transition

        return () => {
            cancelAnimationFrame(enter);
            clearTimeout(hideTimer);
            clearTimeout(closeTimer);
        };
    }, []);

    const themeClasses = type === 'success' 
        ? 'bg-green-50 border-green-500 text-green-800' 
        : 'bg-red-50 border-red-500 text-red-800';

    
    return (
    <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center
            gap-3 px-6 py-4 rounded-lg shadow-lg border cursor-pointer
            transition-all duration-300 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
            ${themeClasses}`}
        onClick={onClose}
    >
        {type === 'success' ? (
            <svg
                className="h-5 w-5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12.5l3 3 5-6" />
            </svg>
        ) : (
            <svg
                className="h-5 w-5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                >
                <circle cx="12" cy="12" r="10" />
                <path d="M15 9l-6 6M9 9l6 6" />
            </svg>
        )}
        <span>{message}</span>
    </div>
    );
}