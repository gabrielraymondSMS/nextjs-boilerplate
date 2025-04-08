import { fetchUserList } from "@/lib/api/users/userService" // API call
import { useQuery } from "@tanstack/react-query"             // React Query
import { useMemo } from "react"

export const useUserList = (params: { limit: number; page: number }) => {
  // 🔁 Memoize params to prevent unnecessary re-renders & refetches
  const memoizedParams = useMemo(() => params, [params.limit, params.page])

  return useQuery({
    queryKey: ["userList", memoizedParams],           // 📛 Unique query key based on parameters for caching
    queryFn: () => fetchUserList(params),             // 🧠 Fetch function that receives params
    staleTime: 1000 * 60 * 5,                         // 🕒 Data is considered fresh for 5 minutes
    gcTime: 1000 * 60 * 10,                           // 🗑️ Cache will be garbage-collected after 10 minutes
    placeholderData: (previousData) => previousData,  // ⌛ Show previous data immediately while fetching new data
  })
}