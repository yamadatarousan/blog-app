// frontend/components/ThemeProvider.tsx
'use client';
import { ReactNode, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // クッキーまたはlocalStorageからテーマを取得
    const savedTheme =
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('theme='))
        ?.split('=')[1] || localStorage.getItem('theme');
    setIsDark(savedTheme === 'dark');
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // テーマ変更時にlocalStorageとクッキーを更新
    if (isDark) {
      localStorage.setItem('theme', 'dark');
      document.cookie = 'theme=dark; path=/; max-age=31536000';
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#000000';
      document.documentElement.style.color = '#e5e7eb';
    } else {
      localStorage.setItem('theme', 'light');
      document.cookie = 'theme=light; path=/; max-age=31536000';
      document.documentElement.classList.remove('dark');
      document.documentElement.style.backgroundColor = '#f3f4f6';
      document.documentElement.style.color = '#1f2937';
    }
  }, [isDark]);

  // マウント前にダークテーマ優先のプレースホルダー
  if (!isMounted) {
    return (
      <div
        className="min-h-screen bg-black text-gray-200"
        style={{ backgroundColor: '#000000', color: '#e5e7eb' }}
      />
    );
  }

  return (
    <>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      {children}
    </>
  );
}