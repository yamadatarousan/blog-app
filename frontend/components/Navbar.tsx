'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // クライアントサイドでマウント後にテーマを確定
  useEffect(() => {
    setMounted(true);
  }, []);

  // マウント前はレンダリングをスキップ（ハイドレーションエラー防止）
  if (!mounted) {
    return (
      <nav
        className="bg-indigo-600 text-white shadow-lg"
        data-testid="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold tracking-tight">
                Blog App
              </Link>
            </div>
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              {/* ナビアイテムのみ表示、テーマボタンは非表示 */}
              {[
                { name: 'Posts', href: '/posts' },
                { name: 'About', href: '/about' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? 'bg-indigo-800 text-white'
                      : 'hover:bg-indigo-500 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
               </button>
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <div className="lg:hidden px-4 pb-4 bg-indigo-600 transition-all duration-300 ease-in-out">
              {[
                { name: 'Posts', href: '/posts' },
                { name: 'About', href: '/about' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? 'bg-indigo-800 text-white'
                      : 'hover:bg-indigo-500 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </nav>
      );
    }

    return (
      <nav
        className="bg-indigo-600 dark:bg-gray-900 text-white dark:text-gray-200 shadow-lg"
        data-testid="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold tracking-tight">
                Blog App
              </Link>
            </div>
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              {[
                { name: 'Posts', href: '/posts' },
                { name: 'About', href: '/about' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? 'bg-indigo-800 dark:bg-gray-800 text-white dark:text-gray-200'
                      : 'hover:bg-indigo-500 dark:hover:bg-gray-700 hover:text-white dark:hover:text-gray-200'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <SunIcon className="w-5 h-5 text-yellow-400" data-testid="theme-icon" />
                ) : (
                  <MoonIcon className="w-5 h-5 text-gray-200" data-testid="theme-icon" />
                )}
              </button>
            </div>
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-indigo-500 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-gray-200"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden px-4 pb-4 bg-indigo-600 dark:bg-gray-900 transition-all duration-300 ease-in-out">
            {[
              { name: 'Posts', href: '/posts' },
              { name: 'About', href: '/about' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? 'bg-indigo-800 dark:bg-gray-800 text-white dark:text-gray-200'
                    : 'hover:bg-indigo-500 dark:hover:bg-gray-700 hover:text-white dark:hover:text-gray-200'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? 'ライトモード' : 'ダークモード'}
            </button>
          </div>
        )}
      </nav>
    );
  };

  export default Navbar;