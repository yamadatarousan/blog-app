export default async function Post({ params }) {
    const res = await fetch(`http://127.0.0.1:8000/api/posts/${params.id}`, { cache: 'no-store' });
    const post = await res.json();
  
    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <a href="/posts">Back to Posts</a>
      </div>
    );
  }