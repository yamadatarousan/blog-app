'use client';

export default function ThemeScript() {
  return (
    <script
      id="theme-script"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const theme = localStorage.getItem('theme');
            if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
              document.documentElement.style.setProperty('--navbar-bg', '#111827');
            } else {
              document.documentElement.classList.remove('dark');
              document.documentElement.style.setProperty('--navbar-bg', '#4f46e5');
            }
          })();
        `,
      }}
    />
  );
}