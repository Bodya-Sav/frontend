import React, { createContext, useState, useEffect } from "react";
import { getAllCourses } from "../services/CourseService"; // функция для получения курсов с сервера

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseList, setCourseList] = useState([]);

  // Загружаем список курсов при монтировании провайдера (для администратора)
  // useEffect(() => {
  //   getAllCourses()
  //     .then((data) => {
  //       if (data && data.result) {
  //         setCourseList(data.result);
  //         // По умолчанию можно выбрать первый курс, если список не пустой
  //         if (data.result.length > 0) {
  //           setSelectedCourse(data.result[0]);
  //         }
  //       }
  //     })
  //     .catch((error) => console.error("Ошибка загрузки списка курсов:", error));
  // }, []);

  return (
    <CourseContext.Provider
      value={{ selectedCourse, setSelectedCourse, courseList, setCourseList }}
    >
      {children}
    </CourseContext.Provider>
  );
};
