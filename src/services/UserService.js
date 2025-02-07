import { fetchWrapper } from "./FetchWrapper";

export const getAllUsers = async () => {
  console.log("запрос получения всех пользователей");

  const res = await fetchWrapper("/get_all_user", "GET");
  console.log(res.result);
  return res;
};

export const updateUserInfo = async (
  chat_id,
  fio,
  isAdmin,
  isAuth,
  isDeleted
) => {
  console.log("запрос обновления информации о пользователе");

  const body = JSON.stringify({
    chat_id,
    fio,
    isAdmin,
    isAuth,
    isDeleted,
  });
  const res = await fetchWrapper("/update_user", "POST", body);
  console.log(res.result);
  return res;
};
