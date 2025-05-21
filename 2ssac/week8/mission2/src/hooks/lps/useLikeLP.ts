import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";

export const useLikeLP = (lpId: number) => {
  const queryClient = useQueryClient();

  const addLike = useMutation({
    mutationFn: async () => {
      await axiosInstance.post(`/v1/lps/${lpId}/likes`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpDetail", lpId] });
    },
  });

  const removeLike = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpDetail", lpId] });
    },
  });

  return { addLike, removeLike };
};
