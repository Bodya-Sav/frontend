import { useEffect } from "react";
import { WebApp } from "@twa-dev/sdk";

function App() {
  const [isAdmin, setIsAdmin] = useState(null); // null - начальное состояние, пока данные не загружены
  const [loading, setLoading] = useState(true); // Состояние для отображения загрузки

  useEffect(() => {
    // Инициализация Telegram Web App
    WebApp.ready();

    // Запрос данных о пользователе с сервера
    fetch("/api/getUser")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsAdmin(data.isAdmin); // Устанавливаем значение isAdmin
        setLoading(false); // Завершаем загрузку
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false); // Завершаем загрузку даже в случае ошибки
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Отображаем загрузку, пока данные не получены
  }

  return (
    <div>
      <h1>Расписание</h1>
      <p>Здесь будет расписание</p>

      {isAdmin ? (
        <div>
          <h2>Админский экран</h2>
          <p>Дополнительные функции для администратора</p>
        </div>
      ) : (
        <div>
          <h2>Обычный экран</h2>
          <p>Добро пожаловать, обычный пользователь!</p>
        </div>
      )}
    </div>
  );
}

export default App;
