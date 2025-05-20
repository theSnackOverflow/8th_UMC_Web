import { useMutation } from "@tanstack/react-query";
import axiosPublicInstance from "../../services/axiosPublicInstance";

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axiosPublicInstance.post(
        "/v1/uploads/public",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data.data.imageUrl;
    },
  });
};
