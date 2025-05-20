import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axiosInstance.post("/v1/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data.data.imageUrl as string;
    },
  });
};
