"use server";

import cloudinary from "@/lib/cloudinary";

const MAX_IMAGES = 5;
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function uploadProductImages(formData: FormData) {
  const files = formData.getAll("files") as File[];

  if (!files.length) {
    throw new Error("No files uploaded.");
  }

  if (files.length > MAX_IMAGES) {
    throw new Error(`Maximum ${MAX_IMAGES} images allowed.`);
  }

  const uploadedUrls: string[] = [];

  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      throw new Error(`${file.name} is not a valid image.`);
    }

    if (file.size > MAX_SIZE) {
      throw new Error(`${file.name} exceeds the 5MB limit.`);
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise<{
      secure_url: string;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "products",
          },
          (error, result) => {
            if (error || !result) {
              reject(error ?? new Error("Upload failed."));
              return;
            }

            resolve(result as { secure_url: string });
          },
        )
        .end(buffer);
    });

    uploadedUrls.push(result.secure_url);
  }

  return uploadedUrls;
}
