import { fetchWrapper } from "./FetchWrapper";

export const checkAuth = async (chat_id) => {
  console.log("запрос аутентификации");

  const body = JSON.stringify({ chat_id });
  const res = await fetchWrapper("/check_auth", "POST", body);
  console.log(res.result);
  return res;
};
