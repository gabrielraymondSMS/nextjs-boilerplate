"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLead } from "@/lib/api/leads/leadsService";
import { LeadFormValues } from "@/types/LeadType";

export const useCreateLead = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, LeadFormValues>({
    mutationFn: createLead,
    onSuccess: (data) => {
      console.log("Create Lead successful:", data?.data);
      queryClient.invalidateQueries({ queryKey: ["leadList"] });
    },
    onError: (error) => {
      console.log("create Error:", error.message);
    },
  });
};
