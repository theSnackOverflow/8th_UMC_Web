import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type Tag = {
  id: number;
  name: string;
};

export type Like = {
  id: number;
  userId: number;
  lpId: number;
};

export type LPDetail = {
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

export const useLPDetail = (lpId: string) => {
  return useQuery<LPDetail>({
    queryKey: ["lpDetail", lpId],
    queryFn: async () => {
      const res = await axios.get(`/v1/lps/${lpId}`);
      return res.data.data;
    },
  });
};
