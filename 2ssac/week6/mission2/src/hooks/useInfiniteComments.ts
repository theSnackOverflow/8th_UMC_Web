import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";

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

export const useInfiniteComments = (
  lpId: string | number,
  order: "asc" | "desc"
) => {
  return useInfiniteQuery<
    CommentResponse,
    Error,
    CommentResponse,
    [_1: string, _2: string | number, _3: "asc" | "desc"],
    number | null
  >({
    queryKey: ["comments", lpId, order],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const res = await axiosInstance.get<{ data: CommentResponse }>(
        `/v1/lps/${lpId}/comments`,
        {
          params: {
            cursor: pageParam,
            order,
            limit: 5,
          },
        }
      );

      console.log("응답 데이터", res.data.data); // 댓글 무한 스크롤 - 콘솔 응답 확인
      return res.data.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
