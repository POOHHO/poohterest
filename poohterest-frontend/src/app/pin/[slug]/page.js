"use client";

import {
  getPinById,
  getCommentsByPinId,
  addComment,
  deleteComment,
} from "@/services/api";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function PinDetail() {
  const [pin, setPin] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const pinId = usePathname().split("/").pop();
  const [jwtdecoded, setJwt] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
  
      try {

        if (token) {
          const decoded = jwtDecode(token);
          setJwt(decoded);
        }
  
        const pinData = await getPinById(pinId);
        setPin(pinData);
  
        const commentsData = await getCommentsByPinId(pinId);
        setComments(commentsData.comments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [pinId, newComment]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
     
      console.log(pinId);
      console.log(jwtdecoded?.userId);
      console.log(newComment);
      const formData = new FormData();
      formData.append("pinId", pinId);
      formData.append("userId", jwtdecoded?.userId);
      formData.append("comment", newComment);

      if (newComment) {
        await addComment(formData);
        setComments((prev) => [...prev, newComment]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!pin) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Failed to delete comment:", error);
      alert(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-wrap md:flex-nowrap">
          <div className="flex-shrink-0">
            <img
              className="h-full w-full object-cover md:w-96"
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${pin.imageUrl}`}
              alt={pin.title}
            />
          </div>
          <div className="w-full p-8 break-words">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {pin.title}
            </h2>
            <p className="text-gray-600 mb-4">{pin.description}</p>
            <div className="flex items-center mb-6">
              <img
                className="h-10 w-10 rounded-full mr-4"
                src={
                  `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${pin.user?.profileImage}` ||
                  "https://via.placeholder.com/40"
                }
                alt={pin.user?.username || "Anonymous"}
              />
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  {pin.user?.username || "Anonymous"}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(pin.createdAt) || "Unknown date"}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Comments</h3>
              <ul className="space-y-4 w-full max-h-64 overflow-y-auto pr-2">
                {comments.map((comment, index) => (
                  <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <img
                          src={
                            comment.user?.profileImage ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${comment.user?.profileImage}` :
                            `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/uploads/default-profile.png`
                          }
                          alt={comment.user?.username || "Anonymous"}
                          className="h-8 w-8 rounded-full mr-2"
                        />
                        <span className="font-semibold text-gray-700">
                          {comment.user?.username || "Anonymous"}
                        </span>
                      </div>

                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-red-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <p>{comment.comment}</p>
                  </li>
                ))}
              </ul>

              <form onSubmit={handleAddComment} className="mt-6">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                ></textarea>
                <button
                  type="submit"
                  className="w-full mt-2 px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900"
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
