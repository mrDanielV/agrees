import "./globals.css";
import { Header } from './components/Header';
import { Bottom } from './components/Bottom';
import React from 'react'; // <-- добавь импорт React

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-sber-gray">
        <Header />
        {children}
        <Bottom />
      </body>
    </html>
  );
}
