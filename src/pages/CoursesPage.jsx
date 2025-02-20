import React, { useState, useEffect, useContext } from "react";

import AddCourceComponent from "../components/courses/AddCourceComponent";
import ListOfCoursesComponent from "../components/courses/ListOfCoursesComponent";

import { getAllCourses } from "../services/CourseService";

import { useAuthStore } from "../context/useAuthStore";

export default function CoursesPage() {
  const { isSuper, isAdmin, user_id } = useAuthStore();
  const [courses, setCourses] = useState(null);

  const fetchCourses = () => {
    getAllCourses()
      .then(setCourses)
      .catch((error) => console.error("Ошибка загрузки пользователей:", error));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
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
        <h2>Страница с курсами</h2>
        {isAdmin && user_id !== 1 ? (
          <AddCourceComponent setCourses={setCourses} />
        ) : (
          <h2>Вы не админ</h2>
        )}
        <ListOfCoursesComponent courses={courses} />
      </div>
    </>
  );
}

// import React, { useState, useContext } from "react";
// import AddCourceComponent from "../components/courses/AddCourceComponent";
// import ListOfCoursesComponent from "../components/courses/ListOfCoursesComponent";
// import { useAuthStore } from "../context/useAuthStore";

// export default function CoursesPage() {
//   const { isSuper, isAdmin, user_id } = useAuthStore();

//   // Статичные данные для курсов
//   const [courses, setCourses] = useState({
//     result: [
//       {
//         id: 1,
//         title: "Курс по React",
//         topics: [
//           { id: 101, title: "Основы React" },
//           { id: 102, title: "React Hooks" },
//         ],
//       },
//       {
//         id: 2,
//         title: "Курс по Node.js",
//         topics: [
//           { id: 201, title: "Основы Node.js" },
//           { id: 202, title: "Express.js" },
//         ],
//       },
//     ],
//   });

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         marginBottom: "100px",
//       }}
//     >
//       <h2>Страница с курсами</h2>
//       {isAdmin && user_id !== 1 ? (
//         <AddCourceComponent courses={courses} setCourses={setCourses} />
//       ) : (
//         <h2>Вы не админ</h2>
//       )}
//       <ListOfCoursesComponent courses={courses} />
//     </div>
//   );
// }
