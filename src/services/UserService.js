import { fetchWrapper } from "./FetchWrapper";

export const getAllUsers = async () => {
  const res = fetchWrapper("/get_all_user", "GET");
  console.log(res.result);
  return res;
};
