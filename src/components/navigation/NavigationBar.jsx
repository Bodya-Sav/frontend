import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@telegram-apps/telegram-ui";
import { ROUTES } from "../../navigation/routes";

import { AuthContext } from "../../context/AuthContext";

// Массив с описанием вкладок (страниц)
const navItems = [
  { id: "users", label: "Пользователи", path: ROUTES.USERS },
  { id: "schedule", label: "Расписание", path: ROUTES.SHEDULE },
  // В будущем можно добавить другие страницы, например:
  // { id: 'profile', label: 'Профиль', path: ROUTES.PROFILE },
];

const NavigationBar = () => {
  const { isAdmin, isAuth } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Флаг, показывающий, открыта ли клавиатура (на основе изменения высоты окна)
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  // Фиксируем исходную высоту окна при монтировании компонента
  const [initialHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      const currentHeight = window.innerHeight;
      // Если высота окна уменьшилась более чем на 100px по сравнению с исходной, считаем, что клавиатура открыта
      if (initialHeight - currentHeight > 100) {
        setKeyboardOpen(true);
      } else {
        setKeyboardOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    // Очистка слушателя при размонтировании
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [initialHeight]);

  // Если клавиатура открыта, не отображаем панель
  if (keyboardOpen) return null;

  return (
    <div
      style={{
        position: "fixed", // фиксированное позиционирование
        bottom: 0, // прижато к нижней части экрана
        left: 0, // прижато к левому краю
        width: "100%", // занимает всю ширину экрана
        display: "flex",
        justifyContent: "space-around",
        padding: "10px",
        borderTop: "1px solid #ccc",
        backgroundColor: "#fff",
        zIndex: 1000, // чтобы панель была поверх прочего контента
      }}
    >
      {navItems.map((item) => {
        // Если элемент с id "users" и пользователь не является админом — не рендерим кнопку
        if (item.id === "users" && !isAdmin) {
          return null;
        }
        // Определяем, активна ли текущая вкладка и начинается ли текущий путь с заданного значения
        const isActive = location.pathname === item.path;

        return (
          <Button
            key={item.id}
            onClick={() => navigate(item.path)}
            style={{
              backgroundColor: isActive ? "#0088cc" : "#fff",
              color: isActive ? "#fff" : "#000",
              padding: "5px",
              borderRadius: "4px",
              height: "40px",
            }}
          >
            {item.id === "users" ? (
              <img src="../../assets/icons/users.svg" alt="Пользователи" />
            ) : (
              <img
                src="../../assets/icons/calendar-date.svg"
                alt="Расписание"
              />
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default NavigationBar;
