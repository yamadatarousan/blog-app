export default async function Posts() {
    const res = await fetch('http://127.0.0.1:8000/api/posts', { cache: 'no-store' });
    const posts = await res.json();

    return (
        <div>
        <h1>Blog Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <a href={`/posts/${post.id}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      </div>
    );
}
