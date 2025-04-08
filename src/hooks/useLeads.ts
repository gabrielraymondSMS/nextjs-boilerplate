import { fetchLeadList } from "@/lib/api/leads/leadsService";
import { useQuery } from "@tanstack/react-query";

export const useLeadList = (params: { limit: number; page: number }) => {
  return useQuery({
    queryKey: ["leadList", params],
    queryFn: () => fetchLeadList(params),
    staleTime: 1000 * 60 * 5, // ✅ Keeps data fresh for 5 minutes (reduces re-fetching)
    gcTime: 1000 * 60 * 10, // ✅ Keeps cache for 10 minutes
    placeholderData: (previousData) => previousData, // ✅ Use previous data instead of fetching
  });
};
