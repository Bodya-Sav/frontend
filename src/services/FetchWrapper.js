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

    const test = await response.json();

    if (!response.ok) {
      throw new Error(test.message || `Ошибка сети: ${response.status}`);
    }

    return test;
  } catch (error) {
    console.error(`Ошибка при запросе ${endpoint}:`, error);
    throw error;
  }
};
