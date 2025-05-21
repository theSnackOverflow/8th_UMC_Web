import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";

export type Tag = {
  id: number;
  name: string;
};

export type Like = {
  id: number;
  userId: number;
  lpId: number;
};

export type LP = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Like[];
};

interface LPResponse {
  data: LP[];
  nextCursor: number | null;
}

export const useInfiniteLPs = (order: "asc" | "desc") => {
  return useInfiniteQuery<
    LPResponse,
    Error,
    LPResponse,
    ["infiniteLPs", "asc" | "desc"],
    number
  >({
    queryKey: ["infiniteLPs", order],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      await new Promise((res) => setTimeout(res, 500));
      const res = await axiosInstance.get<{ data: LPResponse }>(`/v1/lps`, {
        params: {
          cursor: pageParam,
          order,
        },
      });
      return res.data.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};