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

interface LPListResponse {
  data: LP[];
  nextCursor?: number;
}

export const fetchLPs = async (
  params?: GetLPsParams
): Promise<LPListResponse> => {
  const response = await axios.get("/v1/lps", { params });
  return response.data.data; // 여기서 .data 구조만 명확히 확인
};

export const fetchLPDetail = async (lpId: number): Promise<LP> => {
  const response = await axios.get(`/v1/lps/${lpId}`);
  return response.data.data;
};
