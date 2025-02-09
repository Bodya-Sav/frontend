import React, { useState, useEffect, useContext } from "react";

import AddCourceComponent from "../components/courses/AddCourceComponent";
import ListOfCoursesComponent from "../components/courses/ListOfCoursesComponent";

import { getAllCourses } from "../services/CourseService";

import { AuthContext } from "../context/AuthContext";

export default function CoursesPage() {
  const { isSuper, isAdmin, user_id } = useContext(AuthContext);
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
