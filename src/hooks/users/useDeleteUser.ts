"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/lib/api/users/userService";
import { useSnackbarStore } from "@/stores/useSnackbarStore";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  return useMutation<any, Error, { id: number | string }>({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      console.log("Delete successful:", data?.data);
      showSnackbar("User deleted successfully.", "success", "top");
      queryClient.invalidateQueries({ queryKey: ["userList"] });
    },
    onError: (error: any) => {
      showSnackbar(error?.response?.data?.message, "error", "top");
    },
  });
};
