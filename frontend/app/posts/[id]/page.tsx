// frontend/app/posts/[id]/page.tsx
import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CommentForm from '@/components/CommentForm';

type Post = {
  id: number;
  title: string;
  content: string;
  image?: string;
  category: string;
  created_at: string;
};

type Comment = {
  id: number;
  post_id: number;
  content: string;
  created_at: string;
};

async function PostDetail({ id }: { id: string }) {
  const res = await fetch(`http://127.0.0.1/api/posts/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  const post: Post = await res.json();
  return (
    <>
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
      <h1 className="text-4xl font-bold text-primary dark:text-white mb-4">{post.title}</h1>
      <p className="text-gray-500 dark:text-gray-200 mb-6">
        {new Date(post.created_at).toLocaleDateString('ja-JP')}
      </p>
      <div className="prose prose-lg text-gray-700 dark:text-gray-200 mb-8">{post.content}</div>
      <Link
        href="/posts"
        className="mt-6 inline-block text-accent dark:text-accent-dark hover:underline"
      >
        ← Back to Posts
      </Link>
    </>
  );
}

async function Comments({ id }: { id: string }) {
  const res = await fetch(`http://127.0.0.1/api/posts/${id}/comments`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Comments API error: ${res.status} ${res.statusText}`);
  }
  const comments: Comment[] = await res.json();
  return (
    <>
      {comments.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-200 mb-6">まだコメントがありません。</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm"
            >
              <p className="text-gray-700 dark:text-gray-200">{comment.content}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {new Date(comment.created_at).toLocaleDateString('ja-JP')}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default async function Post({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-6 min-h-screen" data-testid="container">
      <Suspense
        fallback={<div className="bg-black h-64 rounded-xl animate-pulse" />}
      >
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 max-w-3xl mx-auto animate-fade-in">
          <Suspense
            fallback={<div className="bg-black h-64 rounded-xl animate-pulse" />}
          >
            <PostDetail id={params.id} />
          </Suspense>
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-primary dark:text-white mb-6">コメント</h2>
            <Suspense
              fallback={<div className="bg-black h-32 rounded-xl animate-pulse" />}
            >
              <Comments id={params.id} />
            </Suspense>
            <Suspense
              fallback={<div className="bg-black h-32 rounded-xl animate-pulse" />}
            >
              <CommentForm postId={params.id} />
            </Suspense>
          </div>
        </div>
      </Suspense>
    </div>
  );
}