// frontend/app/posts/page.tsx（変更なし、参考）
type Post = {
  id: number;
  title: string;
  content: string;
  image?: string;
  category: string;
  created_at: string;
};

export default async function Posts({ searchParams }: { searchParams: { page?: string } }) {
  const page = parseInt(searchParams.page || '1', 10);
  const perPage = 6;
  try {
    const res = await fetch(`http://127.0.0.1/api/posts?page=${page}&per_page=${perPage}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    const { data: posts, last_page }: { data: Post[]; last_page: number } = await res.json();

    return (
      <div className="container mx-auto p-6 bg-white dark:bg-black min-h-screen" data-testid="container">
        <h1 className="text-4xl font-bold text-primary dark:text-white mb-8 text-center animate-fade-in">
          Blog Posts
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <a
              key={post.id}
              href={`/posts/${post.id}`}
              className="block bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              )}
              <div className="p-6">
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded-full mb-2 ${
                    post.category === 'Tech'
                      ? 'bg-accent'
                      : post.category === 'Lifestyle'
                      ? 'bg-purple-500'
                      : 'bg-gray-500'
                  }`}
                >
                  {post.category}
                </span>
                <h2 className="text-xl font-semibold text-secondary dark:text-white mb-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-200 line-clamp-2">{post.content}</p>
                <p className="text-sm text-gray-500 dark:text-gray-200 mt-2">
                  {new Date(post.created_at).toLocaleDateString('ja-JP')}
                </p>
              </div>
            </a>
          ))}
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          {page > 1 && (
            <a
              href={`/posts?page=${page - 1}`}
              className="px-4 py-2 bg-accent dark:bg-accent-dark text-white rounded-lg hover:bg-opacity-80 dark:hover:bg-opacity-80"
            >
              Previous
            </a>
          )}
          {page < last_page && (
            <a
              href={`/posts?page=${page + 1}`}
              className="px-4 py-2 bg-accent dark:bg-accent-dark text-white rounded-lg hover:bg-opacity-80 dark:hover:bg-opacity-80"
            >
              Next
            </a>
          )}
        </div>
      </div>
    );
  } catch (error) {
    return <div className="text-red-500 text-center p-6">Error: {error.message}</div>;
  }
}