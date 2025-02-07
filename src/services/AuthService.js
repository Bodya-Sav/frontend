import { fetchWrapper } from "./FetchWrapper";

export const checkAuth = async (chat_id) => {
  const body = JSON.stringify({ chat_id });
  const res = fetchWrapper("/check_auth", "POST", body);
  console.log({ res });

  return res;
};
