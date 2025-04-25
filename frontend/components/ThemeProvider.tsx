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
    } else {
      localStorage.setItem('theme', 'light');
      document.cookie = 'theme=light; path=/; max-age=31536000';
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // マウント前に最小限のプレースホルダー（チラつき防止）
  if (!isMounted) {
    return <div className="min-h-screen bg-gray-100 dark:bg-black" />;
  }

  return (
    <>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      {children}
    </>
  );
}