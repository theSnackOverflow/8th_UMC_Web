import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";

export const useCreateComment = (lpId: number, order: "asc" | "desc") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      axiosInstance.post(`/v1/lps/${lpId}/comments`, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", lpId, order] });
    },
  });
};
