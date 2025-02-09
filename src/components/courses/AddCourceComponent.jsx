import React, { useState, useEffect } from "react";
import { Button } from "@telegram-apps/telegram-ui";

import { AuthContext } from "../../context/AuthContext";
import { addCource } from "../../services/CourseService";

export default function AddCourceComponent() {
  const { isSuper, isAdmin, user_id } = useContext(AuthContext);
  const [courseName, setCourseName] = useState("");

  const handleCreateCourse = async () => {
    if (!courseName) {
      alert("Введите название курса");
      return;
    }
    try {
      const res = await addCource({ courseName, user_id });
      console.log("Курс успешно добавлен:", res);
      // можно очистить инпут после успешного запроса
      setCourseName("");
    } catch (error) {
      console.error("Ошибка при добавлении курса:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        marginBottom: "100px",
      }}
    >
      <h3>Добавление курса</h3>
      {isAdmin ? (
        <>
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
        </>
      ) : (
        <h2>Вы не админ</h2>
      )}
    </div>
  );
}
