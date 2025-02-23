"use client";

import { getPin } from "@/services/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [pins, setPin] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const listPin = await getPin();
      setPin(listPin);
    };
    fetchData();
  }, []);

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-5 p-4">
      {pins?.map((pin) => (
        <div 
          key={pin.id} 
          className="break-inside-avoid mb-4 rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
        >
          <Link href={`/pin/${pin.id}`}>
            <div className="relative group">
              <img 
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${pin.imageUrl}`} 
                alt={pin.title}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <h1 className="text-white text-lg font-semibold p-4">
                  {pin.title}
                </h1>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
