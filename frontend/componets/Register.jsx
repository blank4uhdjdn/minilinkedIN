import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password,
      });

      console.log(response.data);
      navigate("/login");
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-2">Mini-linkedIn🐛</h2>
        <p className="text-center text-gray-600 mb-8">Share your favorite reads</p>

        {/* Form */}
        <div className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 mt-1">
              <span className="text-gray-400 mr-2">@</span>
              <input
                type="text"
                className="w-full py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 px-3 py-2 rounded-md mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 mt-1">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="ml-2 text-blue-500 hover:text-blue-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Error */}
          {errorMessage && (
            <p className="text-sm text-red-500 text-center">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSignUp}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-300"
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="text-blue-600 hover:underline">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
