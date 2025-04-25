// frontend/components/ThemeProvider.tsx
'use client';
import { ReactNode, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  // サーバーではfalse、クライアントでlocalStorageを即反映
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // クライアントで初回マウント時にlocalStorageをチェック
    const savedTheme = localStorage.getItem('theme');
    setIsDark(savedTheme === 'dark');
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // テーマ変更時にlocalStorageとhtmlクラスを更新
    if (isDark) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // マウント前にレンダリングをスキップ（ハイドレーション不一致を回避）
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      {children}
    </>
  );
}