const PostCard = ({ post }) => (
  <div className="border p-4 mb-4">
    <img src={post.image} alt="Post" />
    <h3>{post.title}</h3>
    <p>{post.caption}</p>
    <span>⭐ {post.rating}</span>
    <p>By {post.user.username}</p>
  </div>
);
