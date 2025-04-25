export default async function About() {
    return (
      <div className="container mx-auto p-6 bg-white dark:bg-black min-h-screen" data-testid="container">
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