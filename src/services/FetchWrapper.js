import { API_URL } from "./api";

export const fetchWrapper = async (endpoint, method = "GET", body = null) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      // Преобразуем тело запроса в JSON-строку
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      // Используем сообщение об ошибке, пришедшее с сервера
      console.log(data.message || `Ошибка сети: ${response.status}`);

      //throw new Error;
    }

    return data;
  } catch (error) {
    console.error(`Ошибка при запросе ${endpoint}:`, error);
    throw error;
  }
};
