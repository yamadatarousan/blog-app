// frontend/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import ThemeProvider from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Blog Frontend',
  description: 'Next.js blog with Tailwind CSS',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // サーバーでクッキーからテーマを取得
  const cookieStore = cookies();
  const theme = cookieStore.get('theme')?.value;
  const isDark = theme === 'dark';

  return (
    <html lang="ja" className={isDark ? 'dark' : ''} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* 即時背景色適用でチラつき防止 */}
        <style>{`
          body {
            background-color: ${isDark ? '#000000' : '#f3f4f6'};
          }
        `}</style>
        {/* クライアントでのテーマ同期 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || document.cookie.split('; ').find(row => row.startsWith('theme='))?.split('=')[1];
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('Theme script error:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans bg-gray-100 dark:bg-black">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}