type Post = {
    id: number;
    title: string;
    content: string;
    image?: string;
    category: string;
    created_at: string;
  };
  
  export default async function Post({ params }: { params: { id: string } }) {
    try {
      const res = await fetch(`http://127.0.0.1/api/posts/${params.id}`, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }
      const post: Post = await res.json();
  
      return (
        <div className="container mx-auto p-6">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto animate-fade-in">
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover rounded-t-xl mb-6"
              />
            )}
            <span
              className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded-full mb-4 ${
                post.category === 'Tech'
                  ? 'bg-accent'
                  : post.category === 'Lifestyle'
                  ? 'bg-purple-500'
                  : 'bg-gray-500'
              }`}
            >
              {post.category}
            </span>
            <h1 className="text-4xl font-bold text-primary mb-4">{post.title}</h1>
            <p className="text-gray-500 mb-6">
              {new Date(post.created_at).toLocaleDateString()}
            </p>
            <div className="prose prose-lg text-gray-700">{post.content}</div>
            <a
              href="/posts"
              className="mt-6 inline-block text-accent hover:underline"
            >
              ← Back to Posts
            </a>
          </div>
        </div>
      );
    } catch (error) {
      return <div className="text-red-500 text-center p-6">Error: {error.message}</div>;
    }
  }