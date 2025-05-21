import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";
import { type LP } from "../../api/ls";

interface LPListResponse {
  data: LP[];
  nextCursor: number | null;
}

export const useSearchLps = (search: string) => {
  return useInfiniteQuery<
    LPListResponse,
    Error,
    LPListResponse,
    [string, string]
  >({
    queryKey: ["searchLps", search],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axiosInstance.get("/v1/lps", {
        params: {
          search,
          cursor: pageParam,
          limit: 10,
          order: "desc",
        },
      });

      return res.data.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    enabled: !!search,
  });
};
