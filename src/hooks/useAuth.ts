"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function useAuth() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.replace("/login"); // Redirect to login if not authenticated
    } else {
      setAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  return { isAuthenticated, isLoading };
}
