// temporarily disable this rule until pagination is implemented
import { jsonPlaceholderApiClient } from "./client";

export const fetchUserList = async () => {
  const response = await jsonPlaceholderApiClient.get("/users");
  return response.data;
};
