import { fetchWrapper } from "./FetchWrapper";

export const addFreeSchedule = async (data) => {
  const body = JSON.stringify(data);
  const data = await fetchWrapper("/add_free_schedule", "POST", body);
  console.log(data.result);
  return res;
};

export const getAllSchedule = async () => {
  const data = await fetchWrapper("/get_all_schedule", "GET");
  console.log(data.result);
  return res;
};

export const deleteSchedule = async (selectedSchedules) => {
  const body = JSON.stringify({ id: selectedSchedules });
  const data = fetchWrapper("/delete_schedule", "POST", body);
  console.log(data.result);
  return res;
};
