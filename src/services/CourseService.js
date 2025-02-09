import { fetchWrapper } from "./FetchWrapper";

export const addCource = async ({ user_id, courseName }) => {
  console.log("Запрос добавления курса");

  const body = JSON.stringify({ user_id, courseName });
  const res = await fetchWrapper("/add_course", "POST", body);
  console.log("Результат запроса:", res.result);
  return res;
};
