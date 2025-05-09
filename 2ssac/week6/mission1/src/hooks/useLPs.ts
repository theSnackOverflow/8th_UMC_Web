import { useQuery } from "@tanstack/react-query";
import { fetchLPs, type GetLPsParams, type LP } from "../api/ls";

export const useLPs = (params?: GetLPsParams) => {
  return useQuery<LP[]>({
    queryKey: ["lps", params],
    queryFn: () => fetchLPs(params),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });
};
