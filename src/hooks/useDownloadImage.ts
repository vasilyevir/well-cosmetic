import { upload } from "@/api/image";

interface UseDownloadImageProps {
  file_string?: string;
  file_blob?: FileList;
}

export const useDownloadImage = () => {
  const download = async ({ file_string, file_blob }: UseDownloadImageProps) => {
    if (file_blob?.[0]) {
      return await upload(file_blob[0]);
    }

    return file_string || "";
  };

  return { download };
};
