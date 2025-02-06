import { useState, useEffect, useContext } from "react";
import { Button } from "@telegram-apps/telegram-ui";

import ScheduleComponent from "../components/schedule/ScheduleComponent";
import TimePickerComponent from "../components/schedule/TimePickerComponent";
import DeleteSheduleComponent from "../components/schedule/DeleteSheduleComponent";

import {
  addFreeSchedule,
  getAllSchedule,
  deleteSchedule,
} from "../services/ScheduleService";

import { AuthContext } from "../context/AuthContext";

export default function SchedulePage() {
  const { isAdmin } = useContext(AuthContext);

  const [schedule, setSchedule] = useState(null);
  // Режим добавления – аналог deleteMode
  const [addMode, setAddMode] = useState(false);
  // Флаг, отвечающий за включение/выключение режима удаления (показываются чекбоксы)
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedSchedules, setSelectedSchedules] = useState([]);

  const handleSelectDateTime = async (data) => {
    setSelectedDateTime(data);
    try {
      await addFreeSchedule(data);
      // Закрываем режим добавления после успешного добавления
      setAddMode(false);
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
      setDeleteMode(false);
      const updatedSchedule = await getAllSchedule();
      setSchedule(updatedSchedule);
    } catch (error) {
      console.error("Ошибка при удалении расписания:", error);
    }

    getAllSchedule()
      .then(setSchedule)
      .catch((error) => console.error("Ошибка загрузки расписания:", error));
  };

  useEffect(() => {
    getAllSchedule()
      .then(setSchedule)
      .catch((error) => console.error("Ошибка загрузки расписания:", error));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        height: "auto",
      }}
    >
      {schedule ? (
        <ScheduleComponent
          schedule={schedule}
          deleteMode={deleteMode}
          selectedSchedules={selectedSchedules}
          setSelectedSchedules={setSelectedSchedules}
          handleDeleteSchedules={handleDeleteSchedules}
        />
      ) : (
        <p>Загрузка расписания</p>
      )}
      {isAdmin && (
        <div style={{ marginTop: "1em" }}>
          <Button onClick={() => setAddMode((prev) => !prev)}>
            {addMode ? "Отмена добавления" : "Добавить"}
          </Button>
          {addMode && <TimePickerComponent onSelect={handleSelectDateTime} />}
          <Button
            onClick={() => setDeleteMode((prev) => !prev)}
            style={{ marginLeft: "1em" }}
          >
            {deleteMode ? "Отмена удаления" : "Удалить"}
          </Button>
        </div>
      )}
    </div>
  );
}
