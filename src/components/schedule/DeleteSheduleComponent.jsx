import React from "react";
import { Button } from "@telegram-apps/telegram-ui";

const ScheduleComponent = ({
  schedule,
  selectedSchedules,
  setSelectedSchedules,
  handleDeleteSchedules,
}) => {
  const toggleScheduleSelection = (scheduleId) => {
    setSelectedSchedules((prev) => {
      if (prev.includes(scheduleId)) {
        return prev.filter((id) => id !== scheduleId);
      } else {
        return [...prev, scheduleId];
      }
    });
  };

  return (
    <div>
      <h3>Выберите расписания для удаления:</h3>
      <div>
        {schedule.result.map((item) => (
          <div key={item.id}>
            <input
              type="checkbox"
              checked={selectedSchedules.includes(item.id)}
              onChange={() => toggleScheduleSelection(item.id)}
            />
            <span>{item.dateTime}</span>
          </div>
        ))}
      </div>
      <Button onClick={handleDeleteSchedules}>Удалить выбранные</Button>
    </div>
  );
};

export default ScheduleComponent;
