import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";

type CreateLPRequest = {
  title: string;
  content: string;
  thumbnail: string; // URL
  tags: string[];
  published: boolean;
};

export const useCreateLP = () => {
  return useMutation({
    mutationFn: (lpData: CreateLPRequest) =>
      axiosInstance.post("/v1/lps", lpData),
  });
};
