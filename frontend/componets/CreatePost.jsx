import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!title || !caption || !image) {
      setErrorMessage("Please fill all fields and upload an image");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      // Upload image to Cloudinary (using unsigned preset)
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "preset2"); // your unsigned preset

      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/ddstanwva/image/upload",
        formData
      );

      const imageUrl = cloudinaryRes.data.secure_url;

      // Post book data to backend
      const token = sessionStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3000/api/post",
        {
          title,
          caption,
          image: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Posted successfully:", response.data);
      alert(" posted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error submitting :", error);
      setErrorMessage(error.response?.data?.message || "Failed to upload");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-2">Mini-LinkedIN🐛</h2>
        <p className="text-center text-gray-600 mb-8">Share your favorite read</p>

        {/* Form */}
        <div className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded-md mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="The Great Gatsby"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Caption */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Caption</label>
            <textarea
              rows={3}
              className="w-full border border-gray-300 px-3 py-2 rounded-md mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="A story about the American dream..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Post Cover</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-3 w-full h-52 object-cover rounded"
              />
            )}
          </div>

          {/* Error */}
          {errorMessage && (
            <p className="text-sm text-red-500 text-center">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-300"
          >
            {isLoading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
