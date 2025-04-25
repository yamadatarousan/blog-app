// frontend/components/CommentForm.tsx
'use client';
import { useState } from 'react';

export default function CommentForm({ postId }: { postId: string }) {
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://127.0.0.1/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: parseInt(postId), content: newComment }),
      });

      if (!res.ok) {
        throw new Error(`Comment submission error: ${res.status} ${res.statusText}`);
      }

      setNewComment('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleCommentSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
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
  );
}