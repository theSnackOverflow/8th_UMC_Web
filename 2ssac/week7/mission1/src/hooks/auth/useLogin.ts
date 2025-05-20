import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await axiosInstance.post("/v1/auth/signin", {
        email,
        password,
      });

      const { accessToken, refreshToken } = res.data.data;
      return { accessToken, refreshToken };
    },
  });
};
