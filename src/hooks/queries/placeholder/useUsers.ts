import { useQuery } from "@tanstack/react-query";
import { fetchUserList } from "@/lib/api/placeholderService";

export const useUserList = (limit: number = 10, offset: number = 0) => {
  return useQuery({
    queryKey: ["userList", limit, offset],
    queryFn: () => fetchUserList(limit, offset),
  });
};
