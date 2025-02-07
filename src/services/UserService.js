import { fetchWrapper } from "./FetchWrapper";

export const getAllUsers = async () => {
  const data = fetchWrapper("/get_all_user", "GET");
  console.log(data.result);
  return res;
};
