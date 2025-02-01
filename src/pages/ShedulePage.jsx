import { useState, useEffect } from "react";
import { Button, Card, Input } from "@telegram-apps/telegram-ui";

const webapp = window.Telegram.WebApp;

function ShedulePage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    webapp.ready();

    console.log("initDataUnsafe:", webapp.initDataUnsafe.user.id);
    const chatId = webapp.initDataUnsafe.user.id;

    // запрос на проверку авторизованного пользователя
    fetch(`https://pxmx-home.ddns.net:3001/api/mini_app/check_auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка сети");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Ответ от сервера:", data);

        setIsAdmin(data.isAdmin);
        if (data.isAuth) {
          setIsAuth(data.isAuth);
          console.log("пользователь авторизован");
        } else {
          console.log("пользователь не авторизован");
        }
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных:", error);
      });
  }, []);

  return (
    <div>
      {isAuth ? (
        <div>
          <h1>Расписание</h1>
          <p>Здесь будет расписание</p>
          {isAdmin ? (
            <div>
              <h2>Привет, админ</h2>
              <p>Дополнительные функции для администратора</p>
            </div>
          ) : (
            <div>
              <h2>Привет, пользователь</h2>
              <p>Добро пожаловать, обычный пользователь!</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1>Дождитесь подтверждения регистрации</h1>
        </div>
      )}
    </div>
  );
}

export default ShedulePage;
