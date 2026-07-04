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

      <div className="overflow-hidden rounded-[32px] border border-slate-800 bg-slate-900">
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
        <div className="mt-4 grid grid-cols-4 gap-3 sm:gap-4">
          {gallery.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`overflow-hidden rounded-2xl border transition ${
                selectedImage === image ? "border-blue-500" : "border-slate-800"
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
