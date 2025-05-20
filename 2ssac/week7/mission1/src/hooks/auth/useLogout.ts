import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      await axiosInstance.post("/v1/auth/signout");
    },
  });
};
