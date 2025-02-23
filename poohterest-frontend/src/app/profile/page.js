"use client";
import { getProfile, updateProfile } from "@/services/api";
import { useState, useEffect } from "react";
import { FaCamera, FaPen, FaPlus } from "react-icons/fa";
import UserPin from "@/app/component/userpin";
export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profileImage: "",
    bio: "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getProfile();
        setProfile(user);
        setFormData({
          username: user.username,
          email: user.email,
          profileImage: user.profileImage || "",
          bio: user.bio || "",
        });
      } catch (err) {
        setError("Unable to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isModalOpen]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setFormData((prev) => ({ ...prev, profileImage: previewUrl }));
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("bio", formData.bio);
      if (file) data.append("profileImage", file);

      const updatedProfile = await updateProfile(data);
      setProfile(updatedProfile);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );

  return (
    <div className="flex flex-col items-center pt-8 pb-6">
      <div className="relative">
        <img
          src={
            profile?.profileImage
              ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${profile.profileImage}`
              : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/uploads/default-profile.png`
          }
          alt={profile?.username || "Default Profile"}
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
        />

        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute bottom-0 right-0 bg-gray-100 p-2 rounded-full hover:bg-gray-200"
        >
          <FaCamera className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <h1 className="text-3xl font-bold mt-4">{profile?.username}</h1>
      <p className="text-gray-600">@{profile?.username.toLowerCase()}</p>
      <p className="text-gray-700 mt-2 max-w-md text-center px-4">
        {profile?.bio}
      </p>
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 font-semibold"
        >
          Edit profile
        </button>
      </div>
      <UserPin />

      {/* Create Pin Button */}
      <button className="fixed bottom-6 right-6 bg-blue-950 text-white p-4 rounded-full shadow-lg hover:bg-blue-900">
        <FaPlus className="w-6 h-6" />
      </button>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Edit profile</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Profile photo
                </label>
                <div className="relative w-24 h-24 mx-auto">
                  <img
                    src={
                      formData.profileImage
                    }
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />

                  <label className="absolute bottom-0 right-0 bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-gray-200">
                    <FaPen className="w-4 h-4 text-gray-600" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-950 text-white rounded-full hover:bg-blue-900"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
