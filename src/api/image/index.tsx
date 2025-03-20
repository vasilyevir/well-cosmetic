import { put } from "@vercel/blob";

export const upload = async (file?: File, nameFolder?: string) => {
  if (file) {
    const filename = file.name;
    const folder = nameFolder ? `/${nameFolder}/` : "/";

    const blob = await put(`${folder}${filename}` || "default.png", file, {
      access: "public",
      token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
    });

    return blob.url;
  }

  throw new Error("Не является файлом");
};
