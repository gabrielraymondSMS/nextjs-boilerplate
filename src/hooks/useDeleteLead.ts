"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLead } from "@/lib/api/leads/leadsService";
import { useSnackbarStore } from "@/stores/useSnackbarStore";

export const useDeleteLead = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  return useMutation<any, Error, { id: number | string }>({
    mutationFn: deleteLead,
    onSuccess: (data) => {
      console.log("Delete successful:", data?.data);
      showSnackbar("Lead deleted successfully.", "success", "top");
      queryClient.invalidateQueries({ queryKey: ["leadList"] });
    },
    onError: (error: any) => {
      showSnackbar(error?.response?.data?.message, "error", "top");
    },
  });
};
