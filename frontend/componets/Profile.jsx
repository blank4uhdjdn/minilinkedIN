import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    photo: "",
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        name: parsedUser.username || "",
        email: parsedUser.email || "",
        photo: parsedUser.profileImage || "",
      });
    }
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Not authenticated");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:3000/api/post/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRecommendations(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-10 flex justify-center">
      <div className="w-full h-full bg-white rounded-lg shadow-lg border border-gray-200 p-10 max-w-full">

        {/* Profile Info Row */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-12">

          {/* Profile Picture */}
          {user.photo ? (
            <img
              src={user.photo}
              alt="Profile"
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                marginRight: 16,
              }}
              className="border-4 border-blue-600 object-cover shadow-md"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-xl font-semibold border-4 border-gray-300 select-none">
              No Photo
            </div>
          )}

          {/* User Details */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-lg font-semibold text-gray-700 uppercase tracking-wider mb-1">Name</h2>
            <p className="text-2xl font-bold text-gray-900">{user.name || "Anonymous"}</p>

            <h2 className="text-lg font-semibold text-gray-700 uppercase tracking-wider mt-8 mb-1">Email</h2>
            <p className="text-xl text-gray-800">{user.email || "Not Provided"}</p>
          </div>

          {/* Logout Button */}
          <div className="flex-shrink-0">
            <button
              onClick={handleLogout}
              className="px-7 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Recommendations Section */}
        <section>
          <h3 className="text-3xl font-extrabold text-blue-700 mb-6 border-b-2 border-blue-200 pb-2">
            Your posts
          </h3>

          {loading && <p className="text-gray-600">Loading Posts...</p>}

          {error && <p className="text-red-500 font-semibold">{error}</p>}

          {!loading && !error && recommendations.length === 0 && (
            <p className="text-gray-500 italic">You have no posts yet.</p>
          )}

          <ul className="space-y-6">
            {recommendations.map((rec) => (
              <li
                key={rec._id || rec.id}
                className="p-5 bg-blue-50 border border-blue-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <p className="text-xl font-semibold text-blue-900">{rec.title || "Untitled Recommendation"}</p>
                <p className="mt-2 text-gray-800">{rec.description || "No description provided."}</p>
                {rec.date && (
                  <p className="mt-3 text-sm text-blue-600 font-medium">
                    Posted on: {new Date(rec.date).toLocaleDateString()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
}
