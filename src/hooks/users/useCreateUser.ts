"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/lib/api/users/userService";
import { User } from "@/types/ColumnType";
import { useSnackbarStore } from "@/stores/useSnackbarStore";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  return useMutation<any, Error, User>({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log("Register successful:", data?.data);
      queryClient.invalidateQueries({ queryKey: ["userList"] });
    },
    onError: (error:any) => {
      showSnackbar(error?.response?.data?.message, "error", "top");
    },
  });
};
