import axios from "../services/axiosInstance";

export type LP = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  tags: { id: number; name: string }[];
  likes: { id: number; userId: number }[];
};

export type GetLPsParams = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: "asc" | "desc";
};

export const fetchLPs = async (params?: GetLPsParams): Promise<LP[]> => {
  const response = await axios.get("/v1/lps", { params });
  return response.data.data.data;
};

export const fetchLPDetail = async (lpId: number): Promise<LP> => {
  const response = await axios.get(`/v1/lps/${lpId}`);
  return response.data.data;
};
