"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLead } from "@/lib/api/leads/leadsService";

export const useUpdateLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }: { id: string | number; body: any }) => {
      return updateLead({ id, body });
    },
    onSuccess: (data) => {
      console.log("Update Lead successful:", data?.data);
      queryClient.invalidateQueries({ queryKey: ["leadList"] });
    },
    onError: (error) => {
      console.log("Login failed:", error.message);
    },
  });
};
