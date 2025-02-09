import { fetchWrapper } from "./FetchWrapper";

export const addCource = async ({ id, title }) => {
  console.log("Запрос добавления курса");

  const body = JSON.stringify({ id, title });
  const res = await fetchWrapper("/add_course", "POST", body);
  console.log("Результат запроса:", res.result);
  return res;
};
