import { useState, useEffect } from "react";
import { deletePin, getUserPin } from "@/services/api";
import Link from "next/link";

export default function UserPin() {
  const [pins, setPins] = useState([]);
  const [loadingPins, setLoadingPins] = useState(true);
  const [errorPins, setErrorPins] = useState(null);
  const [activeTab, setActiveTab] = useState("created");

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const userPins = await getUserPin();
        setPins(userPins);
      } catch (err) {
        setErrorPins("Unable to load pins. Please try again later.");
      } finally {
        setLoadingPins(false);
      }
    };
    fetchPins();
  }, []);

  const handleDelete = async (pinId) => {
    try {
      await deletePin(pinId);
      setPins((prevPins) => prevPins.filter((pin) => pin.id !== pinId));
    } catch (err) {
      console.error("Error deleting pin:", err);
    }
  };

  return (
    <div className="flex flex-col items-center pt-8 pb-6">
      <div className="border-t mt-8 w-full">
        <div className="flex justify-center space-x-6 mt-4">
          <button
            className={`py-2 px-4 font-semibold ${
              activeTab === "created"
                ? "text-black border-b-2 border-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("created")}
          >
            Created
          </button>
        </div>
      </div>

      {activeTab === "created" && (
        <div className="mt-6 w-full px-4">
          {loadingPins ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
          ) : errorPins ? (
            <p className="text-center text-red-500">{errorPins}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pins.map((pin) => (
                <div
                  key={pin.id}
                  className="w-full h-full relative bg-gray-100 rounded-lg shadow overflow-hidden group"
                >
                  <Link href={`/pin/${pin.id}`}>
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${pin.imageUrl}`}
                      alt={pin.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm truncate">
                      {pin.title}
                    </div>
                  </Link>
                  <button
                    onClick={() => handleDelete(pin.id)}
                    className="absolute top-2 right-2 bg-opacity-50 bg-red-600 text-white px-3 py-1 rounded shadow hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
