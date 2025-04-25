// frontend/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { ReactNode, Suspense } from 'react';
import ThemeProvider from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Blog Frontend',
  description: 'Next.js blog with Tailwind CSS',
};

export default function RootLayout({ children }: { children: ReactNode }) {
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
        <style>{`
          html, body, .container {
            background-color: ${isDark ? '#000000 !important' : '#f3f4f6 !important'};
            color: ${isDark ? '#e5e7eb !important' : '#1f2937 !important'};
            margin: 0;
            padding: 0;
          }
          * {
            transition: none !important;
          }
        `}</style>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || document.cookie.split('; ').find(row => row.startsWith('theme='))?.split('=')[1];
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.backgroundColor = '#000000';
                    document.documentElement.style.color = '#e5e7eb';
                    document.querySelectorAll('.container').forEach(el => {
                      el.style.backgroundColor = '#000000';
                      el.style.color = '#e5e7eb';
                    });
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.backgroundColor = '#f3f4f6';
                    document.documentElement.style.color = '#1f2937';
                    document.querySelectorAll('.container').forEach(el => {
                      el.style.backgroundColor = '#f3f4f6';
                      el.style.color = '#1f2937';
                    });
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
        <ThemeProvider>
          <Suspense fallback={<div className="min-h-screen bg-black text-gray-200" />}>
            {children}
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}