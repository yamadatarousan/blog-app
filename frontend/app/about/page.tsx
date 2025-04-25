// frontend/app/about/page.tsx
import { Suspense } from 'react';

async function AboutContent() {
  return (
    <div className="container mx-auto p-6 min-h-screen" data-testid="container">
      <h1 className="text-4xl font-bold text-primary dark:text-white mb-8 text-center animate-fade-in">
        About
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 text-gray-700 dark:text-gray-200">
          自分用のブログアプリを作っている最中です
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
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
      <AboutContent />
    </Suspense>
  );
}