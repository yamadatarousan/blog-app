// frontend/app/posts/[id]/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

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

export default function Post() {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://127.0.0.1/api/posts/${id}`, {
          cache: 'no-store',
        });
        if (!res.ok) {
          throw new Error(`API error: ${res.status} ${res.statusText}`);
        }
        const data: Post = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`http://127.0.0.1/api/posts/${id}/comments`, {
          cache: 'no-store',
        });
        if (!res.ok) {
          throw new Error(`Comments API error: ${res.status} ${res.statusText}`);
        }
        const data: Comment[] = await res.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://127.0.0.1/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: parseInt(id), content: newComment }),
      });

      if (!res.ok) {
        throw new Error(`Comment submission error: ${res.status} ${res.statusText}`);
      }

      const comment: Comment = await res.json();
      setComments([...comments, comment]);
      setNewComment('');
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center p-6">Error: {error}</div>;
  }

  if (!post) {
    return <div className="text-gray-500 dark:text-gray-200 text-center p-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-black min-h-screen" data-testid="container">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 max-w-3xl mx-auto animate-fade-in">
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

        {/* コメント欄 */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-primary dark:text-white mb-6">コメント</h2>
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
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                コメントを追加
              </label>
              <textarea
                id="comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 focus:ring-accent focus:border-accent"
                rows={4}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-accent dark:bg-accent-dark text-white py-2 px-4 rounded-lg hover:bg-opacity-90 dark:hover:bg-opacity-90 transition"
            >
              コメントする
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}