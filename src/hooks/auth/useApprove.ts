"use client";
import { approveUser } from "@/lib/api/auth/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useApproveUser() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<any, Error, { email: string; status: string }>({
    mutationFn: approveUser,
    onSuccess: (data) => {
      console.log("Activated successful:", data?.data);
      queryClient.invalidateQueries({ queryKey: ["userList"] });
      router.push("/users");
    },
    onError: (error) => {
      console.log("Login failed:", error.message);
    },
  });
}
