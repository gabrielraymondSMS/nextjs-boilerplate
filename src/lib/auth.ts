"use client";
import Cookies from "js-cookie";

export function logout() {
  Cookies.remove("token");
  window.location.href = "/auth/login";
}

export function isAuthenticated(): boolean {
  return !!Cookies.get("token");
}
