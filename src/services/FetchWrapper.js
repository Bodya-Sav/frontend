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
      options.body = body;
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
      // Если сервер возвращает подробную информацию об ошибке, передаем её
      throw new Error(data.message || `Ошибка сети: ${response.status}`);
    }

    if (response.success) {
      return await response.json();
    } else console.log("ошибка ответа сервера: ", response.message);
  } catch (error) {
    console.error(`Ошибка при запросе ${endpoint}:`, error);
    throw error;
  }
};
