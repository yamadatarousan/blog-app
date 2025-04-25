// frontend/components/ThemeProvider.tsx
'use client';
import { ReactNode, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedTheme =
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('theme='))
        ?.split('=')[1] || localStorage.getItem('theme');
    setIsDark(savedTheme === 'dark');
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isDark) {
      localStorage.setItem('theme', 'dark');
      document.cookie = 'theme=dark; path=/; max-age=31536000';
      document.documentElement.classList.add('dark');
    } else {
      localStorage.setItem('theme', 'light');
      document.cookie = 'theme=light; path=/; max-age=31536000';
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center">
        <svg
          className="animate-spin h-10 w-10 text-gray-200"
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
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  }

  return (
    <>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      {children}
    </>
  );
}