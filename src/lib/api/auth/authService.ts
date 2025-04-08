import { sonergyApiClient } from "../client";

export const forgetPassword = async (data: { email: string }) => {
  const response = await sonergyApiClient.post("/auth/forget-password", data);
  return response.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await sonergyApiClient.post("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (credentials: {
  name: string;
  email: string;
  role: string;
  password: string;
}) => {
  const response = await sonergyApiClient.post("/auth/register", credentials);
  return response.data;
};

export const approveUser = async (credentials: {
  email: string;
  status: string;
}) => {
  const response = await sonergyApiClient.post("/auth/approve", credentials);
  return response.data;
};
