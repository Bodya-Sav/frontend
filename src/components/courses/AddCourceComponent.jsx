// import React, { useState, useEffect, useContext } from "react";
// import { Button } from "@telegram-apps/telegram-ui";

// import { AuthContext } from "../../context/AuthContext";
// import { addCource, getAllCourses } from "../../services/CourseService";

// export default function AddCourceComponent({ setCourses }) {
//   const { isSuper, isAdmin, user_id } = useContext(AuthContext);
//   const [courseName, setCourseName] = useState("");

//   const handleCreateCourse = async () => {
//     if (!courseName) {
//       alert("Введите название курса");
//       return;
//     }
//     try {
//       const res = await addCource({ id: user_id, title: courseName });
//       console.log("Курс успешно добавлен:", res);
//       // можно очистить инпут после успешного запроса
//       setCourseName("");

//       getAllCourses()
//         .then(setCourses)
//         .catch((error) =>
//           console.error("Ошибка загрузки пользователей:", error)
//         );
//     } catch (error) {
//       console.error("Ошибка при добавлении курса:", error);
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyItems: "center",
//         marginBottom: "100px",
//       }}
//     >
//       <h3>Добавление курса</h3>
//       <input
//         type="text"
//         placeholder="Название курса"
//         value={courseName}
//         onChange={(e) => setCourseName(e.target.value)}
//         style={{
//           marginBottom: "10px",
//           padding: "5px",
//           width: "250px",
//           fontSize: "16px",
//         }}
//       />
//       <Button onClick={handleCreateCourse}>Создать курс</Button>
//     </div>
//   );
// }

import React, { useState, useContext } from "react";
import { Button } from "@telegram-apps/telegram-ui";
import { AuthContext } from "../../context/AuthContext";

export default function AddCourceComponent({ courses, setCourses }) {
  const { user_id } = useContext(AuthContext);
  const [courseName, setCourseName] = useState("");

  const handleCreateCourse = () => {
    if (!courseName) {
      alert("Введите название курса");
      return;
    }
    // Создаем новый курс и добавляем его в список
    const newCourse = {
      id: courses.result.length + 1, // Простейшая генерация id
      title: courseName,
      topics: [],
      // можно добавить user_id, дату создания и прочее
    };

    setCourses((prev) => ({
      result: [...prev.result, newCourse],
    }));
    console.log("Курс успешно добавлен:", newCourse);
    setCourseName("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "100px",
      }}
    >
      <h3>Добавление курса</h3>
      <input
        type="text"
        placeholder="Название курса"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "5px",
          width: "250px",
          fontSize: "16px",
        }}
      />
      <Button onClick={handleCreateCourse}>Создать курс</Button>
    </div>
  );
}
