// components/LikeButton.tsx
'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

type LikeButtonProps = {
  postId: number;
  initialLikes: number;
  initialLiked: boolean;
};

export default function LikeButton({ postId, initialLikes, initialLiked }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialLiked);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // クッキー操作
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop()?.split(';').shift() : null;
  };
  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  };

  // セッションID取得/生成
  const [sessionId, setSessionId] = useState<string | null>(null);
  useEffect(() => {
    let id = getCookie('like_session_id');
    if (!id) {
      id = uuidv4();
      setCookie('like_session_id', id, 30); // 30日有効
    }
    setSessionId(id);
  }, []);

  const handleLike = async () => {
    if (isLoading || !sessionId) return;
    const previousLikes = likes;
    const previousLiked = liked;
    setLikes(likes + 1);
    setLiked(true);
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      console.log('Sending like request for postId:', postId, 'to:', `${apiUrl}/api/posts/${postId}/like`);
      const res = await fetch(`${apiUrl}/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Like-Session-Id': sessionId,
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Failed to like: ${res.status} ${errorData.message || 'Unknown error'}`);
      }
      const { likes: newLikes, liked: newLiked } = await res.json();
      setLikes(newLikes);
      setLiked(newLiked);
    } catch (error: any) {
      console.error('Like error:', error);
      setLikes(previousLikes);
      setLiked(previousLiked);
      setError(error.message || 'Failed to like the post.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlike = async () => {
    if (isLoading || !sessionId) return;
    const previousLikes = likes;
    const previousLiked = liked;
    setLikes(likes - 1);
    setLiked(false);
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      console.log('Sending unlike request for postId:', postId, 'to:', `${apiUrl}/api/posts/${postId}/like`);
      const res = await fetch(`${apiUrl}/api/posts/${postId}/like`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Like-Session-Id': sessionId,
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Failed to unlike: ${res.status} ${errorData.message || 'Unknown error'}`);
      }
      const { likes: newLikes, liked: newLiked } = await res.json();
      setLikes(newLikes);
      setLiked(newLiked);
    } catch (error: any) {
      console.error('Unlike error:', error);
      setLikes(previousLikes);
      setLiked(previousLiked);
      setError(error.message || 'Failed to unlike the post.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2 mb-8">
      <button
        onClick={liked ? handleUnlike : handleLike}
        disabled={isLoading || !sessionId}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
          liked ? 'bg-red-500' : 'bg-gray-500'
        } text-white hover:opacity-90 transition-opacity ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <svg
          className="w-5 h-5"
          fill={liked ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        {liked ? 'Unlike' : 'Like'} ({likes})
      </button>
      {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
}