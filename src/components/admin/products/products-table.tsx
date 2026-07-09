"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { uploadProductImages } from "@/actions/upload.actions";

import Image from "next/image";

interface Props {
  onChange: (urls: string[]) => void;
  defaultImages?: string[];
}

export default function ProductImageUpload({
  onChange,
  defaultImages = [],
}: Props) {
  const [images, setImages] = useState<string[]>(defaultImages);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files?.length) return;

    if (images.length + files.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      const uploadedUrls = await uploadProductImages(formData);

      const nextImages = [...images, ...uploadedUrls];

      setImages(nextImages);

      onChange(nextImages);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  function removeImage(index: number) {
    const nextImages = images.filter((_, i) => i !== index);

    setImages(nextImages);

    onChange(nextImages);
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-slate-800">Product Images</h3>

        <p className="text-sm text-slate-500">Upload up to 5 images</p>
      </div>

      <label className="flex h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-amber-500 hover:bg-amber-50">
        <Upload size={34} className="text-slate-500" />

        <span className="mt-4 text-sm font-medium text-slate-700">
          {uploading ? "Uploading..." : "Click to upload images"}
        </span>

        <span className="mt-1 text-xs text-slate-500">
          JPG, PNG, WEBP (Maximum 5 Images)
        </span>

        <input
          type="file"
          accept="image/*"
          multiple
          disabled={uploading}
          className="hidden"
          onChange={handleUpload}
        />
      </label>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {images.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="relative overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm"
            >
              <Image
                src={image}
                alt={`Product ${index + 1}`}
                width={300}
                height={300}
                className="aspect-square w-full object-cover"
              />

              {index === 0 && (
                <div className="absolute left-2 top-2 rounded-lg bg-amber-500 px-2 py-1 text-xs font-semibold text-white shadow">
                  Cover
                </div>
              )}

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow transition hover:bg-red-600"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.map((image, index) => (
        <input
          key={`${image}-${index}`}
          type="hidden"
          name="images"
          value={image}
        />
      ))}
    </div>
  );
}
