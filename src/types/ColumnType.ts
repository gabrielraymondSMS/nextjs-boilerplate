import { JSX } from "react";

export type Column<T> = {
  key: keyof T | string;
  label: string;
  fixed?: "left" | "right";
  width?: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => JSX.Element;
};

export type ForgetPasswordTypes = {
  email: string;
};

export type User = {
  id?: number | string;
  name: string;
  email: string;
  password: string;
  role: string;
  phone?: string | null;
  status?: boolean;
  image?: string;
  createdDate?: string;
};

export type CreateUserFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  phone?: string | null;
};

export type UpdateUserFormInputs = {
  name: string;
  email: string;
  password?: string; // Password bersifat opsional
  confirmPassword?: string;
  role?: string | null; // 🟢 Bisa `string` atau `null`
  phone?: string | null;
};
