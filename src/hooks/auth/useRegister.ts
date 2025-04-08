"use client";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/lib/api/auth/authService";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const router = useRouter();
  return useMutation<
    any,
    Error,
    { name: string; email: string; role: string; password: string }
  >({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Register successful:", data?.data);
      router.push("/login");
    },
    onError: (error) => {
      console.log("Login failed:", error.message);
    },
  });
};
