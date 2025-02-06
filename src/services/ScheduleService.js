import { fetchWrapper } from "./FetchWrapper";

export const addFreeSchedule = async (data) => {
  const body = JSON.stringify(data);
  return fetchWrapper("/add_free_schedule", "POST", body);
};

export const getAllSchedule = async () => {
  return fetchWrapper("/get_all_schedule", "GET");
};

export const deleteSchedule = async (selectedSchedules) => {
  const body = JSON.stringify({ id: selectedSchedules });
  return fetchWrapper("/delete_schedule", "POST", body);
};
