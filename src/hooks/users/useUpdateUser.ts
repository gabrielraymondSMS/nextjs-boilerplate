"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/lib/api/users/userService";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }: { id: string | number; body: any }) => {
      return updateUser({ id, body });
    },
    onSuccess: (data) => {
      console.log("Register successful:", data?.data);
      queryClient.invalidateQueries({ queryKey: ["userList"] });
    },
    onError: (error) => {
      console.log("Login failed:", error.message);
    },
  });
};
