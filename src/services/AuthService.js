import { fetchWrapper } from "./FetchWrapper";

export const checkAuth = async (chat_id) => {
  const body = JSON.stringify({ chat_id });
  const data = await fetchWrapper("/check_auth", "POST", body);
  console.log(data.result);
  return data;
};
