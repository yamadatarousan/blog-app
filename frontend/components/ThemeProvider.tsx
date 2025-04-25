// frontend/components/ThemeProvider.tsx
'use client';
import { ReactNode, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  // ページロード時にlocalStorageからテーマを復元
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
    }
  }, []);

  // テーマ変更時にlocalStorageとhtmlクラスを更新
  useEffect(() => {
    if (isDark) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      {children}
    </>
  );
}