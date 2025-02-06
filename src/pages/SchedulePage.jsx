import { useState, useEffect } from "react";
import { Button } from "@telegram-apps/telegram-ui";
import ScheduleComponent from "../components/schedule/ScheduleComponent";
import TimePickerComponent from "../components/schedule/TimePickerComponent";
import DeleteSheduleComponent from "../components/schedule/DeleteSheduleComponent";

import {
  addFreeSchedule,
  getAllSchedule,
  deleteSchedule,
} from "../services/ScheduleService";
import { checkAuth } from "../services/AuthService";

const webapp = window.Telegram.WebApp;

export default function SchedulePage() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [schedule, setSchedule] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedSchedules, setSelectedSchedules] = useState([]);

  const handleSelectDateTime = async (data) => {
    setSelectedDateTime(data);
    try {
      await addFreeSchedule(data);
      setShowTimePicker(false);
      const updatedSchedule = await getAllSchedule();
      setSchedule(updatedSchedule);
    } catch (error) {
      console.error("Ошибка при добавлении расписания:", error);
    }
  };

  const handleDeleteSchedules = async () => {
    try {
      if (selectedSchedules.length === 0) return;
      await deleteSchedule(selectedSchedules);
      setSelectedSchedules([]);
      const updatedSchedule = await getAllSchedule();
      setSchedule(updatedSchedule);
    } catch (error) {
      console.error("Ошибка при удалении расписания:", error);
    }
  };

  useEffect(() => {
    webapp.ready();
    const chat_id = webapp.initDataUnsafe.user.id;
    checkAuth(chat_id)
      .then((data) => {
        setIsAdmin(data.result.isadmin);
        setIsAuth(data.result.isauth);
        setLoading(false);
      })
      .catch((error) => console.error("Ошибка авторизации:", error));

    getAllSchedule()
      .then(setSchedule)
      .catch((error) => console.error("Ошибка загрузки расписания:", error));
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        Загрузка...
      </div>
    );
  }

  return (
    <div>
      {isAuth ? (
        <>
          {schedule ? (
            <ScheduleComponent schedule={schedule} />
          ) : (
            <p>Расписание отсутствует</p>
          )}
          {isAdmin && (
            <div>
              <Button onClick={() => setShowTimePicker(true)}>Добавить</Button>
              {showTimePicker && (
                <TimePickerComponent onSelect={handleSelectDateTime} />
              )}
              <Button onClick={() => setShowDelete(true)}>Удалить</Button>
              {showDelete && (
                <DeleteSheduleComponent
                  schedule={schedule}
                  selectedSchedules={selectedSchedules}
                  setSelectedSchedules={setSelectedSchedules}
                  handleDeleteSchedules={handleDeleteSchedules}
                />
              )}
            </div>
          )}
        </>
      ) : (
        <h1>Дождитесь подтверждения регистрации</h1>
      )}
    </div>
  );
}
