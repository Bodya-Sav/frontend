import { fetchWrapper } from "./FetchWrapper";

export const checkAuth = async (chat_id) => {
  const body = JSON.stringify({ chat_id });
  return fetchWrapper("/check_auth", "POST", body);
};
