import type { Post } from '../../page';

type Props = {
  params: { id: string };
};

export default async function Post({ params }: Props) {
  const res = await fetch(`http://127.0.0.1:8000/api/posts/${params.id}`, { cache: 'no-store' });
  const post: Post = await res.json();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p>{post.content}</p>
      <a href="/posts" className="text-blue-600 hover:underline">Back to Posts</a>
    </div>
  );
}