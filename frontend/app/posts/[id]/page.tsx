import type { Post } from '../../page';

type Props = {
  params: { id: string };
};

export default async function Post({ params }: Props) {
  const res = await fetch(`http://127.0.0.1:8000/api/posts/${params.id}`, { cache: 'no-store' });
  const post: Post = await res.json();

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover rounded-xl mb-6 animate-fade-in"
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
      <h1 className="text-4xl font-bold text-primary mb-4 animate-fade-in">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(post.created_at).toLocaleDateString()}
      </p>
      <div className="prose prose-lg text-gray-700 mb-8">{post.content}</div>
      <a
        href="/posts"
        className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back to Posts
      </a>
    </div>
  );
}