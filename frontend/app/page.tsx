// app/posts/[id]/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import LikeButton from '@/components/LikeButton';
import CommentForm from '@/components/CommentForm';

type Post = {
  id: number;
  title: string;
  content: string;
  category: string;
  created_at: string;
  likes: number;
  liked: boolean;
  image?: string;
  tags: string[];
};

type Comment = {
  id: number;
  content: string;
  created_at: string;
};

async function PostContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL is not defined');
    console.log('API URL:', apiUrl);
    console.log('Fetching post from:', `${apiUrl}/api/posts/${id}`);
    const res = await fetch(`${apiUrl}/api/posts/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error('Post fetch failed:', {
        status: res.status,
        statusText: res.statusText,
        response: await res.text(),
      });
      notFound();
    }
    const post: Post = await res.json();

    console.log('Fetching comments from:', `${apiUrl}/api/posts/${id}/comments`);
    const commentsRes = await fetch(`${apiUrl}/api/posts/${id}/comments`, {
      cache: 'no-store',
    });
    if (!commentsRes.ok) {
      console.error('Comments fetch failed:', {
        status: commentsRes.status,
        statusText: commentsRes.statusText,
        response: await commentsRes.text(),
      });
      throw new Error(`Failed to fetch comments: ${commentsRes.status}`);
    }
    const comments: Comment[] = await commentsRes.json();

    return (
      <div className="container mx-auto p-6 min-h-screen bg-gray-100 dark:bg-gray-900" data-testid="container">
        <Link
          href="/posts"
          className="inline-block mb-4 text-primary dark:text-accent-dark hover:underline"
        >
          ← Back to Posts
        </Link>
        <h1 className="text-4xl font-bold text-primary dark:text-white mb-4">{post.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {post.category} | {new Date(post.created_at).toLocaleDateString()}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          <strong>Tags:</strong> {post.tags && post.tags.length > 0 ? post.tags.join(', ') : 'None'}
        </p>
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            width={672}
            height={400}
            className="mx-auto mb-8 rounded-lg shadow-md object-cover"
          />
        ) : (
          <p className="text-gray-600 dark:text-gray-400 mb-8">No image available</p>
        )}
        <p className="text-gray-700 dark:text-gray-200 mb-8">{post.content}</p>
        <LikeButton postId={post.id} initialLikes={post.likes} initialLiked={post.liked} />
        <h2 className="text-2xl font-semibold text-primary dark:text-white mt-12 mb-4">Comments</h2>
        <div className="mb-8">
          <CommentForm postId={post.id} />
        </div>
        {comments.length > 0 ? (
          <ul className="space-y-4 mt-6">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
              >
                <p className="text-gray-700 dark:text-gray-200">{comment.content}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 mt-4">No comments yet.</p>
        )}
      </div>
    );
  } catch (error) {
    console.error('Fetch error:', error);
    return (
      <div className="container mx-auto p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
        <Link href="/posts" className="inline-block mb-4 text-primary dark:text-accent-dark hover:underline">
          ← Back to Posts
        </Link>
        <p className="text-red-500 dark:text-red-400 text-center">
          Failed to load post or comments. Please check if the server is running at the correct URL and try again.
        </p>
      </div>
    );
  }
}

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
          <svg
            className="animate-spin h-10 w-10 text-gray-200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 24 24"
            role="status"
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
      <PostContent params={params} />
    </Suspense>
  );
}