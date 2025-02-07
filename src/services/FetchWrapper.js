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
      console.log(body.json());
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status}`);
    }
    console.log(response.json());

    return await response.json();
  } catch (error) {
    console.error(`Ошибка при запросе ${endpoint}:`, error);
    throw error;
  }
};
