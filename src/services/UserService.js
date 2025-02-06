import { fetchWrapper } from "./FetchWrapper";

export const getAllUsers = async () => {
  return fetchWrapper("/get_all_user", "GET");
};
