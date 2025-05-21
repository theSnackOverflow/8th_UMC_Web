import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";

export const useDeleteComment = (lpId: number, commentId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
    },
  });
};
