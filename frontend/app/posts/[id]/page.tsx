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
    cache: 'no-store', // 最新データを取得
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
    cache: 'no-store', // 最新データを取得
  });
  if (!res.ok) {
    return (
      <p className="text-red-500 dark:text-red-400 mb-6">
        コメントの取得に失敗しました: {res.status} {res.statusText}
      </p>
    );
  }
  // APIが { data: Comment[] } を返す場合に対応
  const response = await res.json();
  const comments: Comment[] = Array.isArray(response) ? response : response.data || [];

  return (
    <>
      {comments.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-200 mb-6">まだコメントがありません。</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
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
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-200 flex items-center justify-center">
          <svg
            className="animate-spin h-10 w-10 text-gray-200"
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
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      }
    >
      <div className="container mx-auto p-6 min-h-screen bg-gray-100 dark:bg-gray-900" data-testid="container">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-3xl mx-auto animate-fade-in border border-gray-200 dark:border-gray-700">
          <PostDetail id={params.id} />
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-primary dark:text-white mb-6">コメント</h2>
            <Comments id={params.id} />
            <Suspense
              fallback={<div className="bg-gray-200 dark:bg-gray-800 h-32 rounded-xl animate-pulse" />}
            >
              <CommentForm postId={params.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </Suspense>
  );
}