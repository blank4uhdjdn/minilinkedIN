import { useEffect, useState } from "react";
import axios from "axios";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view posts.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:3000/api/post/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Assuming response.data is an array of posts
        setPosts(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
      <div className="max-w-5xl w-full">

        <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">
          All Posts
        </h1>

        {loading && <p className="text-center text-gray-600">Loading posts...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-gray-500 italic">No posts available.</p>
        )}

        <ul className="space-y-8">
          {posts.map((post) => (
            <li
              key={post._id}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
            >
              <div className="flex items-center mb-4">
                <img
                  src={post.user?.profileImage || "https://via.placeholder.com/50"}
                  alt={post.user?.username || "User"}
                  className="w-12 h-12 rounded-full mr-4 object-cover border border-gray-300"
                />
                <div>
                  <p className="font-semibold text-gray-900">{post.user?.username || "Unknown User"}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-blue-800 mb-2">{post.title}</h2>
              <p className="text-gray-800 mb-4">{post.caption}</p>

              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="rounded-md max-h-96 w-full object-cover"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
