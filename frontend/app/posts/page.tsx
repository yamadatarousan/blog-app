type Post = {
    id: number;
    title: string;
    content: string;
  };
  
  export default async function Posts() {
    const res = await fetch('http://127.0.0.1:8000/api/posts', { cache: 'no-store' });
    const posts: Post[] = await res.json();
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.id}>
              <a href={`/posts/${post.id}`} className="text-blue-600 hover:underline">
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }