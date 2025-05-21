import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete("/v1/users");
      return res.data;
    },
  });
};
