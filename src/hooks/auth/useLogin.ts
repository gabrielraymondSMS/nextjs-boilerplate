"use client";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/lib/api/auth/authService";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useSnackbarStore } from "@/stores/useSnackbarStore";

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const useLogin = () => {
  const router = useRouter();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  return useMutation<
    {
      data: { token: string };
    },
    Error,
    LoginCredentials
  >({
    mutationFn: async ({ email, password }: LoginCredentials) => {
      return loginUser({ email, password });
    },
    onSuccess: (data, { rememberMe }) => {
      const token = data?.data?.token;
      if (token) {
        Cookies.set("token", token, {
          expires: rememberMe ? 7 : undefined,
          secure: true,
        });
        showSnackbar("Welcome back! You’re now logged in", "success", "top");
        // Perform any necessary side effects here
        router.refresh(); // Redirect to a page, if needed
      } else {
        console.error("Token is missing in the response");
      }
    },
    onError: (error) => {
      showSnackbar(error.message, "error", "top");
    },
  });
};
