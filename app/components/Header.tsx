import Image from 'next/image';

export function Header() {
    return (
        <header className="p-8 bg-white shadow-md z-10">
            <a
                href="https://sberbank-insurance.ru/"
                target="_blank"
                className="inline-flex items-center gap-3 text-xl text-sber-green font-bold"
                rel="noopener noreferrer"
            >
                <Image
                    src="/sber32x32.png"
                    alt="Сбер Страхование"
                    width={32}
                    height={32}
                    priority
                    className="h-8 w-8"
                />
                <span>СБЕР СТРАХОВАНИЕ</span>
            </a>
        </header>
    )
}