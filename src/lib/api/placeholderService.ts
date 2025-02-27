import { jsonPlaceholderApiClient } from "./client";

export const fetchUserList = async (limit: number = 10, offset: number = 0) => {
  const response = await jsonPlaceholderApiClient.get("/users", {
    // params: { limit, offset },
  });
  return response.data;
};

export const createPost = async (data: any) => {
  const response = await jsonPlaceholderApiClient.post("/posts", {
    body: data
  });
  return response.data;
}