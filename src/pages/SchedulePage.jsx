import { useState, useEffect } from "react";
import { Button, Card, Input } from "@telegram-apps/telegram-ui";

import ScheduleComponent from "../components/schedule/ScheduleComponent";

const webapp = window.Telegram.WebApp;

export default function ShedulePage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    webapp.ready();

    console.log("initDataUnsafe:", webapp.initDataUnsafe.user.id);
    const chat_id = webapp.initDataUnsafe.user.id;

    // запрос на проверку авторизованного пользователя
    fetch(`https://pxmx-home.ddns.net:3001/api/mini_app/check_auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chat_id }),
    })
      .then((response) => {
        console.log(JSON.stringify({ chat_id }));

        if (!response.ok) {
          throw new Error("Ошибка сети");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Ответ от сервера:", data);

        setIsAdmin(data.result.isadmin);

        setIsAuth(data.result.isauth);

        if (data.result.isauth) {
          console.log("пользователь авторизован");
        } else {
          console.log("пользователь не авторизован");
        }
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных:", error);
      });

    fetch("https://pxmx-home.ddns.net:3001/api/mini_app/get_all_schedule")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка сети");
        }
        return response.json();
      })
      .then((json) => {
        console.log("Полученное расписание: ", json);
        setSchedule(json);
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
          {!schedule === null ? (
            <div>
              <ScheduleComponent schedule={schedule} />
            </div>
          ) : (
            <div>
              <p>оно пустое братан</p>
            </div>
          )}
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
