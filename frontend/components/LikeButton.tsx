'use client';

import { useState } from 'react';

type LikeButtonProps = {
  postId: number;
  initialLikes: number;
  initialLiked: boolean;
};

export default function LikeButton({ postId, initialLikes, initialLiked }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialLiked);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/like`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const { likes: newLikes, liked: newLiked } = await res.json();
        setLikes(newLikes);
        setLiked(newLiked); // サーバー状態を厳密に反映
      } else {
        console.error(`Failed: ${res.status} ${res.statusText}`, await res.text());
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
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
  );
}