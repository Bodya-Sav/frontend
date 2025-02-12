// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Button } from "@telegram-apps/telegram-ui";
// import { BiPencil, BiPlus } from "react-icons/bi";
// import { getCourseById, updateCourseInfo } from "../services/CourseService";

// export default function CourseDetailPage() {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const [course, setCourse] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editedTitle, setEditedTitle] = useState("");

//   useEffect(() => {
//     getCourseById(courseId)
//       .then(setCourse)
//       .catch((error) => console.error("Ошибка загрузки курса:", error));
//   }, [courseId]);

//   const handleUpdateCourse = async () => {
//     try {
//       await updateCourseInfo(courseId, editedTitle);
//       setEditMode(false);
//       // Обновляем курс
//       const updatedCourse = await getCourseById(courseId);
//       setCourse(updatedCourse);
//     } catch (error) {
//       console.error("Ошибка обновления курса:", error);
//     }
//   };

//   if (!course) return <p>Загрузка курса...</p>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <header style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//         {editMode ? (
//           <>
//             <input
//               type="text"
//               value={editedTitle}
//               onChange={(e) => setEditedTitle(e.target.value)}
//               style={{ fontSize: "24px" }}
//             />
//             <Button onClick={handleUpdateCourse}>
//               <BiPencil /> {/* или текст "Сохранить" */}
//             </Button>
//             <Button onClick={() => setEditMode(false)}>Отмена</Button>
//           </>
//         ) : (
//           <>
//             <h2>{course.title}</h2>
//             <Button
//               onClick={() => {
//                 setEditMode(true);
//                 setEditedTitle(course.title);
//               }}
//             >
//               <BiPencil />
//             </Button>
//           </>
//         )}
//       </header>

//       <section style={{ marginTop: "20px" }}>
//         <h3>Темы курса</h3>
//         <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//           {course.topics && course.topics.length > 0 ? (
//             course.topics.map((topic) => (
//               <div
//                 key={topic.id}
//                 onClick={() => navigate(`/${course.id}/topics/${topic.id}`)}
//                 style={{
//                   border: "1px solid #ccc",
//                   padding: "10px",
//                   borderRadius: "8px",
//                   cursor: "pointer",
//                 }}
//               >
//                 {topic.title}
//               </div>
//             ))
//           ) : (
//             <p>Темы отсутствуют</p>
//           )}
//         </div>
//         <Button
//           onClick={() => {
//             /* открыть форму добавления темы */
//           }}
//         >
//           <BiPlus /> Добавить тему
//         </Button>
//       </section>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@telegram-apps/telegram-ui";
import { BiArrowBack, BiPencil, BiPlusCircle } from "react-icons/bi";

// Для примера используем статичные данные
const staticCourses = [
  {
    id: 1,
    title: "Курс по React",
    topics: [
      { id: 101, title: "Основы React" },
      { id: 102, title: "React Hooks" },
    ],
  },
  {
    id: 2,
    title: "Курс по Node.js",
    topics: [
      { id: 201, title: "Основы Node.js" },
      { id: 202, title: "Express.js" },
    ],
  },
];

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  useEffect(() => {
    // Имитируем получение курса из статичных данных
    const foundCourse = staticCourses.find(
      (course) => course.id === parseInt(courseId)
    );
    setCourse(foundCourse);
  }, [courseId]);

  const handleUpdateCourse = () => {
    // Имитация обновления данных курса
    setCourse((prev) => ({ ...prev, title: editedTitle }));
    setEditMode(false);
  };

  if (!course) return <p>Загрузка курса...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <header style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Кнопка "Назад" */}
        <Button
          onClick={() => navigate(-1)}
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <BiArrowBack size={24} />
        </Button>
        {editMode ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              style={{ fontSize: "24px" }}
            />
            <Button onClick={handleUpdateCourse}>
              <BiPencil size={24} />
            </Button>
            <Button onClick={() => setEditMode(false)}>Отмена</Button>
          </>
        ) : (
          <>
            <h2 style={{ margin: 0 }}>{course.title}</h2>
            <Button
              onClick={() => {
                setEditMode(true);
                setEditedTitle(course.title);
              }}
            >
              <BiPencil size={24} />
            </Button>
          </>
        )}
      </header>

      <section style={{ marginTop: "20px" }}>
        <h3>Темы курса</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {course.topics && course.topics.length > 0 ? (
            course.topics.map((topic) => (
              <div
                key={topic.id}
                onClick={() =>
                  navigate(`/courses/${course.id}/topics/${topic.id}`)
                }
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                {topic.title}
              </div>
            ))
          ) : (
            <p>Темы отсутствуют</p>
          )}
        </div>
        <Button
          onClick={() => alert("Форма добавления темы пока не реализована")}
          style={{ marginTop: "20px" }}
        >
          <BiPlusCircle size={24} /> Добавить тему
        </Button>
      </section>
    </div>
  );
}
