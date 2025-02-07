import { fetchWrapper } from "./FetchWrapper";

export const getAllUsers = async () => {
  console.log("запрос получения всех пользователей");

  const res = await fetchWrapper("/get_all_user", "GET");
  console.log(res.result);
  return res;
};
