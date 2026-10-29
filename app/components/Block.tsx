"use client";

export function Block({code, name, isOpen, onToggle}) {
    return (
        <div className="mb-5 rounded-lg bg-white shadow-lg select-none scroll-m-24 ">
            <div className='p-6 flex items-center gap-4' onClick={onToggle}>
                <div className='flex-1 text-sber-green font-bold'>{name}</div>
                <div className="text-gray-300">
                    <svg 
                        stroke="currentColor" 
                        fill="none" 
                        strokeWidth="2" 
                        viewBox="0 0 24 24" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        height="30" 
                        width="30" 
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
            </div>
            {isOpen && (
                <div className="p-6 min-h-100">
                    content
                </div>
            )}
        </div>
    )
}