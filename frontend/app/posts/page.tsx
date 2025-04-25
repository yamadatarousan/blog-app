import Link from 'next/link';
import { Suspense } from 'react';

type Post = {
  id: number;
  title: string;
  content: string;
  category: string;
  created_at: string;
};

async function PostsContent({ searchParams }: { searchParams: { page?: string; search?: string; category?: string } }) {
  const page = parseInt(searchParams.page || '1', 10);
  const search = searchParams.search || '';
  const category = searchParams.category || '';
  const perPage = 6;
  const res = await fetch(
    `http://127.0.0.1/api/posts?page=${page}&per_page=${perPage}&search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`,
    { cache: 'no-store' }
  );
  const { data: posts, last_page: lastPage } = await res.json();

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-100 dark:bg-gray-900" data-testid="container">
      <h1 className="text-4xl font-bold text-primary dark:text-white mb-8 text-center">Blog Posts</h1>
      <form className="mb-8 flex flex-col sm:flex-row justify-center gap-4">
        <input
          type="text"
          name="search"
          placeholder="Search posts..."
          className="w-full max-w-md p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          defaultValue={search}
        />
        <select
          name="category"
          className="w-full max-w-xs p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          defaultValue={category}
        >
          <option value="">All Categories</option>
          <option value="General">General</option>
          <option value="Tech">Tech</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <button type="submit" className="px-4 py-2 bg-accent dark:bg-accent-dark text-white rounded-lg">
          Search
        </button>
      </form>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: Post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-primary dark:text-white">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{post.category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Posts({ searchParams }: { searchParams: { page?: string; search?: string; category?: string } }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
          <svg
            className="animate-spin h-10 w-10 text-gray-200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            role="status"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      }
    >
      <PostsContent searchParams={searchParams} />
    </Suspense>
  );
}