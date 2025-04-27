import Link from 'next/link';
import { Suspense } from 'react';

type Post = {
  id: number;
  title: string;
  content: string;
  category: string;
  created_at: string;
  tags: string[];
};

async function PostsContent({ searchParams }: { searchParams: { page?: string; search?: string; category?: string; tag?: string } }) {
  const page = parseInt(searchParams.page || '1', 10);
  const search = searchParams.search || '';
  const category = searchParams.category || '';
  const tag = searchParams.tag || '';
  const perPage = 6;

  let tags: string[] = [];
  let posts: Post[] = [];
  let lastPage = 1;
  let currentPage = 1;

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL is not defined');
    console.log('API URL:', apiUrl);
    console.log('Fetching tags from:', `${apiUrl}/api/tags`);
    const tagsRes = await fetch(`${apiUrl}/api/tags`, { cache: 'no-store' });
    if (!tagsRes.ok) {
      console.error('Tags fetch failed:', {
        status: tagsRes.status,
        statusText: tagsRes.statusText,
        response: await tagsRes.text(),
      });
      throw new Error(`Failed to fetch tags: ${tagsRes.status}`);
    }
    tags = await tagsRes.json();

    const postsUrl = `${apiUrl}/api/posts?page=${page}&per_page=${perPage}&search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&tag=${encodeURIComponent(tag)}`;
    console.log('Fetching posts from:', postsUrl);
    const res = await fetch(postsUrl, { cache: 'no-store' });
    if (!res.ok) {
      console.error('Posts fetch failed:', {
        status: res.status,
        statusText: res.statusText,
        response: await res.text(),
      });
      throw new Error(`Failed to fetch posts: ${res.status}`);
    }
    const data = await res.json();
    posts = data.data;
    lastPage = data.last_page;
    currentPage = data.current_page;
  } catch (error) {
    console.error('Fetch error:', error);
    return (
      <div className="container mx-auto p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-primary dark:text-white mb-8 text-center">Blog Posts</h1>
        <p className="text-red-500 dark:text-red-400 text-center">
          Failed to load posts or tags. Please check if the server is running at the correct URL and try again.
        </p>
      </div>
    );
  }

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
        <select
          name="tag"
          className="w-full max-w-xs p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          defaultValue={tag}
        >
          <option value="">All Tags</option>
          {tags.map((t: string) => (
            <option key={t} value={t}>{t}</option>
          ))}
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
            <p className="text-gray-500 dark:text-gray-500">
              <strong>Tags:</strong> {post.tags.join(', ') || 'None'}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center gap-4">
        {currentPage > 1 && (
          <Link href={`/posts?page=${currentPage - 1}&search=${search}&category=${category}&tag=${tag}`} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
            Previous
          </Link>
        )}
        {currentPage < lastPage && (
          <Link href={`/posts?page=${currentPage + 1}&search=${search}&category=${category}&tag=${tag}`} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
            Next
          </Link>
        )}
      </div>
    </div>
  );
}

export default function Posts({ searchParams }: { searchParams: { page?: string; search?: string; category?: string; tag?: string } }) {
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