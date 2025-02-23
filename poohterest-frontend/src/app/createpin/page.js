"use client";
import { createPin } from "@/services/api";
import { useState } from "react";
import { IoCloudUploadOutline, IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function CreatePin() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", file);

    try {
      await createPin(formData);
      setTitle("");
      setDescription("");
      setFile(null);
      setPreviewUrl(null);
      router.push("/pin")
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <button
        onClick={() => router.back()}
        className="left-4 top-20 z-50 p-3 bg-white rounded-full  hover:bg-gray-100 transition-colors"
        aria-label="Go back"
      >
        <IoArrowBack className="w-6 h-6 text-gray-700" />
      </button>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-6">
          <div className="bg-gray-50 border-dashed border-2 border-gray-300 rounded-lg h-[450px] flex items-center justify-center relative">
            {!previewUrl ? (
              <label className="cursor-pointer flex flex-col items-center">
                <IoCloudUploadOutline className="w-12 h-12 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">
                  Click to upload
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                />
              </label>
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setPreviewUrl(null);
                  }}
                  className="absolute w-7 h-7 flex items-center justify-center top-2 right-2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="md:w-1/2 p-6 space-y-6">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add your title"
              className="w-full text-3xl font-bold border-b-2 border-gray-200 focus:border-blue-900 outline-none py-2"
              required
            />
          </div>

          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell everyone what your Pin is about"
              className="w-full h-32 text-gray-700 border-b-2 border-gray-200 focus:border-blue-900 outline-none resize-none"
              required
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading || !file}
              className={`px-6 py-2 rounded-full font-semibold text-white
                  ${
                    loading || !file
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-950 hover:bg-blue-900"
                  }`}
            >
              {loading ? "Creating..." : "Create Pin"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
