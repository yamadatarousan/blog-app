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
          body {
            background-color: ${isDark ? '#000000 !important' : '#f3f4f6 !important'};
            color: ${isDark ? '#e5e7eb !important' : '#1f2937 !important'};
          }
          [data-testid="container"] > * {
            background-color: ${isDark ? '#000000 !important' : 'transparent !important'};
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
                    document.querySelectorAll('[data-testid="container"] > *').forEach(el => {
                      el.style.backgroundColor = '#000000';
                    });
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.backgroundColor = '#f3f4f6';
                    document.documentElement.style.color = '#1f2937';
                    document.querySelectorAll('[data-testid="container"] > *').forEach(el => {
                      el.style.backgroundColor = 'transparent';
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
          <Suspense
            fallback={
              <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center">
                <svg
                  className="animate-spin h-8 w-8 text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            }
          >
            {children}
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}