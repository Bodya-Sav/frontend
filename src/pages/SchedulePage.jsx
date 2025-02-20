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

import { useAuthStore } from "../context/useAuthStore";
import { CourseContext } from "../context/CourseContext";

// export default function SchedulePage() {
//   const { isAdmin } = useAuthStore();
//   const { selectedCourse } = useContext(CourseContext); // Получаем выбранный курс

//   const [schedule, setSchedule] = useState(null);
//   const [addMode, setAddMode] = useState(false);
//   const [deleteMode, setDeleteMode] = useState(false);
//   const [selectedDateTime, setSelectedDateTime] = useState(null);
//   const [selectedSchedules, setSelectedSchedules] = useState([]);

//   const handleSelectDateTime = async (data) => {
//     // Проверяем, выбран ли курс
//     if (!selectedCourse) {
//       console.error("Курс не выбран. Не удалось добавить расписание.");
//       return;
//     }

//     // Добавляем к данным расписания поле course_id из выбранного курса
//     const scheduleData = { ...data, course_id: selectedCourse.id };
//     console.log(JSON.stringify(scheduleData));

//     setSelectedDateTime(data);
//     try {
//       await addFreeSchedule(scheduleData);
//       setAddMode(false);
//       const updatedSchedule = await getAllSchedule();
//       setSchedule(updatedSchedule);
//     } catch (error) {
//       console.error("Ошибка при добавлении расписания:", error);
//     }
//   };

//   const handleDeleteSchedules = async () => {
//     try {
//       if (selectedSchedules.length === 0) return;
//       await deleteSchedule(selectedSchedules);
//       setSelectedSchedules([]);
//       setDeleteMode(false);
//       const updatedSchedule = await getAllSchedule();
//       setSchedule(updatedSchedule);
//     } catch (error) {
//       console.error("Ошибка при удалении расписания:", error);
//     }
//   };

//   useEffect(() => {
//     getAllSchedule()
//       .then(setSchedule)
//       .catch((error) => console.error("Ошибка загрузки расписания:", error));
//   }, []);

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyItems: "center",
//         height: "auto",
//         marginBottom: "100px",
//       }}
//     >
//       {schedule ? (
//         <ScheduleComponent
//           schedule={schedule}
//           deleteMode={deleteMode}
//           selectedSchedules={selectedSchedules}
//           setSelectedSchedules={setSelectedSchedules}
//           handleDeleteSchedules={handleDeleteSchedules}
//         />
//       ) : (
//         <p>Загрузка расписания</p>
//       )}
//       {isAdmin && (
//         <div style={{ marginTop: "1em" }}>
//           <Button onClick={() => setAddMode((prev) => !prev)}>
//             {addMode ? "Отмена добавления" : "Добавить"}
//           </Button>
//           {addMode && <TimePickerComponent onSelect={handleSelectDateTime} />}
//           <Button
//             onClick={() => setDeleteMode((prev) => !prev)}
//             style={{ marginLeft: "1em" }}
//           >
//             {deleteMode ? "Отмена удаления" : "Удалить"}
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }

export default function SchedulePage() {
  const { isAdmin } = useAuthStore();
  const { selectedCourse } = useContext(CourseContext); // Получаем выбранный курс

  const [schedule, setSchedule] = useState(null);
  const [addMode, setAddMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedSchedules, setSelectedSchedules] = useState([]);

  // Функция для загрузки расписания и фильтрации по выбранному курсу
  const fetchFilteredSchedule = async () => {
    try {
      const data = await getAllSchedule();
      if (selectedCourse) {
        // Предполагается, что каждое расписание имеет поле course_id
        const filtered = data.result.filter(
          (item) => Number(item.course_id) === Number(selectedCourse.id)
        );

        setSchedule({ ...data, result: filtered });
      } else {
        // Если курс не выбран, можно либо ничего не показывать, либо показывать всё
        setSchedule(data);
      }
    } catch (error) {
      console.error("Ошибка загрузки расписания:", error);
    }
  };

  // Перезагружаем расписание при монтировании и когда выбранный курс изменяется
  useEffect(() => {
    //fetchFilteredSchedule();
  }, [selectedCourse]);

  const handleSelectDateTime = async (data) => {
    if (!selectedCourse) {
      console.error("Курс не выбран. Не удалось добавить расписание.");
      return;
    }

    // Добавляем поле course_id к данным расписания
    const scheduleData = { ...data, course_id: selectedCourse.id };
    console.log("Отправляем данные:", JSON.stringify(scheduleData));

    setSelectedDateTime(data);
    try {
      await addFreeSchedule(scheduleData);
      setAddMode(false);
      fetchFilteredSchedule();
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
      fetchFilteredSchedule();
    } catch (error) {
      console.error("Ошибка при удалении расписания:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        height: "auto",
        marginBottom: "100px",
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
