import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";

export const useDeleteLP = (lpId: number) => {
  return useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete(`/v1/lps/${lpId}`);
      return res.data;
    },
  });
};
