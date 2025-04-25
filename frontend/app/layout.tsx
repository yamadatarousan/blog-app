// frontend/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import ThemeProvider from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Blog Frontend',
  description: 'Next.js blog with Tailwind CSS',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-gray-100 dark:bg-black">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}