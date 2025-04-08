import { User } from "@/types/ColumnType"         // Import the User type
import { sonergyApiClient } from "../client"      // Import pre-configured Axios client

// Fetch a list of users with optional query parameters (e.g. pagination, search)
export const fetchUserList = async (params: any) => {
  const response = await sonergyApiClient.get("/users", {
    params: params, // Optional query parameters
  })
  return response?.data?.data // Return only the `data` property
}

export const createUser = async (body: User) => {
  const response = await sonergyApiClient.post("/users", body);
  return response.data;
};

export const updateUser = async ({
  id,
  body,
}: {
  id: number | string;
  body: User;
}) => {
  const response = await sonergyApiClient.put(`/users/${id}`, body);
  return response.data;
};

export const deleteUser = async ({ id }: { id: number | string }) => {
  const response = await sonergyApiClient.delete(`/users/${id}`);
  return response.data;
};
