"use client";
import { useMutation } from "@tanstack/react-query";
import { forgetPassword } from "@/lib/api/auth/authService";
// import { useRouter } from "next/router";

export const useForgetPassword = () => {
  //   const router = useRouter();
  return useMutation<any, Error, { email: string }>({
    mutationFn: forgetPassword,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log("Login failed:", error.message);
    },
  });
};
