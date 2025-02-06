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
      }}
    >
      {schedule ? (
        <ScheduleComponent schedule={schedule} />
      ) : (
        <p>Загрузка расписания</p>
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
    </div>
  );
}
