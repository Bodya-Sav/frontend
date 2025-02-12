// import React, { useState, useEffect, useContext } from "react";

// import AddCourceComponent from "../components/courses/AddCourceComponent";
// import ListOfCoursesComponent from "../components/courses/ListOfCoursesComponent";

// import { getAllCourses } from "../services/CourseService";

// import { AuthContext } from "../context/AuthContext";

// export default function CoursesPage() {
//   const { isSuper, isAdmin, user_id } = useContext(AuthContext);
//   const [courses, setCourses] = useState(null);

//   const fetchCourses = () => {
//     getAllCourses()
//       .then(setCourses)
//       .catch((error) => console.error("Ошибка загрузки пользователей:", error));
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyItems: "center",
//           height: "auto",
//           marginBottom: "100px",
//         }}
//       >
//         <h2>Страница с курсами</h2>
//         {isAdmin && user_id !== 1 ? (
//           <AddCourceComponent setCourses={setCourses} />
//         ) : (
//           <h2>Вы не админ</h2>
//         )}
//         <ListOfCoursesComponent courses={courses} />
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCourses } from "../services/CourseService";
import { Button } from "@telegram-apps/telegram-ui";

export default function CoursesPage() {
  const [courses, setCourses] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCourses()
      .then(setCourses)
      .catch((error) => console.error("Ошибка загрузки курсов:", error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Курсы</h2>
      {courses && courses.result ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {courses.result.map((course) => (
            <div
              key={course.id}
              onClick={() => navigate(`/${course.id}`)}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                width: "200px",
                textAlign: "center",
              }}
            >
              <h3>{course.title}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>Загрузка курсов...</p>
      )}
    </div>
  );
}
