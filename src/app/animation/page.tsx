"use client";
import Link from "next/link";
import React, { useEffect } from "react";

const page = () => {
  return (
    <div className="container max-w-7xl mx-auto mt-12">
      <div className="flex flex-col items-center gap-6">
        <div className="p-4 bg-white shadow-lg rounded-md hover:scale-95">
          <Link href="/animation/banner">
            <p>Image Carousel feat. Drag and Drop</p>
          </Link>
        </div>
        <div className="p-4 bg-white shadow-lg rounded-md hover:scale-95">
          <Link href="/animation/texttospeech">
            <p>Text to Speech</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
