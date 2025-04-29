'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type CommentFormProps = {
  postId: number;
};

export default function CommentForm({ postId }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  console.log('CommentForm rendered with postId:', postId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      console.log('Submitting comment for postId:', postId, 'to:', `${apiUrl}/api/comments`);
      const response = await fetch(`${apiUrl}/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, content }),
      });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to submit comment: ${errorData}`);
      }
      setContent('');
      router.refresh();
    } catch (err: Error) {
      setError(err.message || 'Failed to submit comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
        rows={4}
        disabled={isSubmitting}
      />
      {error && <p className="text-red-500 dark:text-red-400 mt-2">{error}</p>}
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-accent dark:bg-accent-dark text-white border-2 border-accent dark:border-accent-dark rounded-lg shadow-md hover:bg-accent-dark dark:hover:bg-accent disabled:opacity-50"
        disabled={isSubmitting || !content.trim()}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Comment'}
      </button>
    </form>
  );
}