import { useQuery } from "@tanstack/react-query";
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

export type Author = {
  id: number;
  name: string;
  avatar: string | null;
};

export type LPDetail = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  author: Author;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Like[];
};

export const useLPDetail = (lpId: string) => {
  return useQuery<LPDetail>({
    queryKey: ["lpDetail", lpId],
    queryFn: async () => {
      if (!lpId) throw new Error("lpId is required");
      const res = await axiosInstance.get(`/v1/lps/${lpId}`);
      if (!res.data?.data) throw new Error("LP data not found");
      return res.data.data;
    },
    enabled: !!lpId, // lpId 없으면 쿼리 비활성화
    retry: 1, // 실패 시 한 번만 재시도
  });
};
