import { useState, useEffect } from "react";
import { Button, Card, Input } from "@telegram-apps/telegram-ui";

import ScheduleComponent from "../components/schedule/ScheduleComponent";
import TimePickerComponent from "../components/schedule/TimePickerComponent";
import DeleteSheduleComponent from "../components/schedule/DeleteSheduleComponent";

const webapp = window.Telegram.WebApp;

export default function ShedulePage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const [schedule, setSchedule] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false); // Показываем/скрываем TimePickerComponent
  const [selectedDateTime, setSelectedDateTime] = useState(null); // Выбранные дата и время
  const [selectedSchedules, setSelectedSchedules] = useState([]);

  const handleSelectDateTime = async (data) => {
    setSelectedDateTime(data); // Сохраняем выбранные дату и время
    <TimePickerComponent />;

    try {
      console.log(
        "Отправка запроса админского добавления расписания на сервер..."
      );

      // Здесь добавь свой запрос на сервер
      const response = await fetch(
        `https://pxmx-home.ddns.net:3001/api/mini_app/add_free_schedule`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const result = await response.json();
      console.log("Ответ сервера:", result);

      setShowTimePicker(false);

      // Дальнейшие действия после успешного запроса
      // Обновляем расписание после добавления
      fetch("https://pxmx-home.ddns.net:3001/api/mini_app/get_all_schedule")
        .then((response) => response.json())
        .then((json) => setSchedule(json))
        .catch((error) => console.error("Ошибка загрузки данных:", error));
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
    }
  };

  const handleDeleteSchedules = async () => {
    try {
      if (selectedSchedules.length === 0) {
        console.log("Нечего удалять");
        return;
      }

      console.log("Отправка запроса на удаление расписания...");
      const response = await fetch(
        `https://pxmx-home.ddns.net:3001/api/mini_app/delete_schedule`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ scheduleIds: selectedSchedules }),
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const result = await response.json();
      console.log("Ответ сервера:", result);

      // Обновляем расписание после удаления
      fetch("https://pxmx-home.ddns.net:3001/api/mini_app/get_all_schedule")
        .then((response) => response.json())
        .then((json) => setSchedule(json))
        .catch((error) => console.error("Ошибка загрузки данных:", error));
      setSelectedSchedules([]); // Очищаем выбранные записи
    } catch (error) {
      console.error("Ошибка при отправке запроса на удаление:", error);
    }
  };

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

    fetch("https://pxmx-home.ddns.net:3001/api/mini_app/get_all_schedule", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка сети");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Полученное расписание: ", data);
        setSchedule(data);
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных:", error);
      });
  }, []);

  return (
    <div>
      {isAuth ? (
        <div>
          {schedule ? (
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
              <div>
                <Button onClick={() => setShowTimePicker(true)}>
                  Добавить
                </Button>
                {showTimePicker && (
                  <TimePickerComponent onSelect={handleSelectDateTime} />
                )}
                <DeleteSheduleComponent
                  schedule={schedule}
                  selectedSchedules={selectedSchedules}
                  setSelectedSchedules={setSelectedSchedules}
                  handleDeleteSchedules={handleDeleteSchedules}
                />
              </div>
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
