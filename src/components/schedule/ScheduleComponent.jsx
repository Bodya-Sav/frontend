// const ScheduleComponent = ({ schedule }) => {
//   if (!schedule || !schedule.result || schedule.result.length === 0) {
//     return <div>Нет доступного расписания</div>;
//   }

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <h2>Расписание</h2>
//       <ul>
//         {schedule.result.map(({ id, fio, themes, data, time }) => {
//           const formattedDate = new Date(data).toLocaleDateString("ru-RU", {
//             day: "2-digit",
//             month: "long",
//             year: "numeric",
//           });

//           return (
//             <li key={id} style={{ marginBottom: "1em" }}>
//               <strong>Дата:</strong> {formattedDate} <br />
//               <strong>Время:</strong> {time} <br />
//               <strong>ФИО:</strong> {fio || "Не указано"} <br />
//               <strong>Темы:</strong> {themes || "Нет информации"}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default ScheduleComponent;

import React from "react";
import { Button } from "@telegram-apps/telegram-ui";

const ScheduleComponent = ({
  schedule,
  deleteMode, // флаг: включен ли режим удаления
  selectedSchedules,
  setSelectedSchedules,
  handleDeleteSchedules,
}) => {
  if (!schedule || !schedule.result || schedule.result.length === 0) {
    return <div>Нет доступного расписания</div>;
  }

  // Функция для переключения выбора записи
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Расписание</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {schedule.result.map((item) => {
          // Форматируем дату (если поле с датой называется data)
          const formattedDate = new Date(item.data).toLocaleDateString(
            "ru-RU",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }
          );
          return (
            <li
              key={item.id}
              style={{
                marginBottom: "1em",
                display: "flex",
                alignItems: "center",
              }}
            >
              {deleteMode && (
                <input
                  type="checkbox"
                  checked={selectedSchedules.includes(item.id)}
                  onChange={() => toggleScheduleSelection(item.id)}
                  style={{ marginRight: "0.5em" }}
                />
              )}
              <div>
                <div>
                  <strong>Дата:</strong> {formattedDate}
                </div>
                <div>
                  <strong>Время:</strong> {item.time}
                </div>
                <div>
                  <strong>ФИО:</strong> {item.fio || "Не указано"}
                </div>
                <div>
                  <strong>Темы:</strong> {item.themes || "Нет информации"}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {deleteMode && (
        <Button onClick={handleDeleteSchedules}>Удалить выбранные</Button>
      )}
    </div>
  );
};

export default ScheduleComponent;
