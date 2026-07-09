"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images?: string[];
  name: string;
}

export default function ProductGallery({ images = [], name }: Props) {
  const gallery = images.length > 0 ? images : ["/placeholder.png"];

  const [selectedImage, setSelectedImage] = useState(gallery[0]);

  return (
    <div className="w-full">
      {/* MAIN IMAGE */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Image
          src={selectedImage}
          alt={name}
          width={800}
          height={1000}
          priority
          className="aspect-[4/5] w-full object-cover"
        />
      </div>

      {/* THUMBNAILS */}

      {gallery.length > 1 && (
        <div className="mt-5 grid grid-cols-4 gap-3">
          {gallery.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                selectedImage === image
                  ? "border-amber-500 shadow-md"
                  : "border-slate-200 hover:border-amber-300"
              }`}
            >
              <Image
                src={image}
                alt={`${name} ${index + 1}`}
                width={200}
                height={200}
                className="aspect-square w-full object-cover transition duration-300 hover:scale-105"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
