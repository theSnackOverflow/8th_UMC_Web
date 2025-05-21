// hooks/useInfiniteComments.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";

export type Comment = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    avatar?: string | null;
  };
};

interface CommentResponse {
  data: Comment[];
  nextCursor: number | null;
}

export const useInfiniteComments = (lpId: number, order: "asc" | "desc") => {
  return useInfiniteQuery<CommentResponse, Error>({
    queryKey: ["comments", lpId, order],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const res = await axiosInstance.get<{ data: CommentResponse }>(
        `/v1/lps/${lpId}/comments`,
        {
          params: {
            cursor: pageParam,
            order,
            limit: 10,
          },
        }
      );
      return res.data.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
