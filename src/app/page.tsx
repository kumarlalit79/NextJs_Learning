"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
  const { data } = useSession();
  console.log(data);

  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut({callbackUrl:"/login"});
      setLoading(false);
    } catch (error) {
      console.log("handleSignOut : ", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      {data && (
        <div className="w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg text-center relative flex flex-col items-center">
          {data.user.image && (
            <div className="relative w-[100px] h-[100px] rounded-full border-2 border-white overflow-hidden">
              <Image src={data.user.image} fill alt="user_image" />
            </div>
          )}
          <h1 className="text-2xl font-semibold my-4">
            Welcome, {data.user.name}
          </h1>
          <button className="w-full py-2 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
      {!data && <div className="text-white">Loading...</div>}
    </div>
  );
};

export default page;
