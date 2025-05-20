import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";

export const useMyInfo = () => {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: async () => {
      const res = await axiosInstance.get("/v1/users/me");
      return res.data;
    },
  });
};
