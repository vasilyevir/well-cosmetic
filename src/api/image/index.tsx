"use server";

import "server-only";
import { put } from "@vercel/blob";

export const upload = async (file?: File) => {
  if (file) {
    const filename = file.name;

    const blob = await put(`${filename}` || "default.png", file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return blob.url;
  }

  throw new Error("Не является файлом");
};
