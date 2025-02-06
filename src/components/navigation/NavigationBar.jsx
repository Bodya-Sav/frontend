import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@telegram-apps/telegram-ui";
import { ROUTES } from "../../navigation/routes";

import { AuthContext } from "../../context/AuthContext";

// import UsersIcon from "../../assets/icons/users.svg";
// import Calendar from "../../assets/icons/calendar-date.svg";

import { ReactComponent as UsersIcon } from "../../assets/icons/users.svg";
import { ReactComponent as Calendar } from "../../assets/icons/calendar-date.svg";

// Массив с описанием вкладок (страниц)
const navItems = [
  { id: "users", label: "Пользователи", path: ROUTES.USERS },
  { id: "schedule", label: "Расписание", path: ROUTES.SHEDULE },
];

const NavigationBar = () => {
  const { isAdmin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Флаг, показывающий, открыта ли клавиатура (на основе изменения высоты окна)
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  // Фиксируем исходную высоту окна при монтировании компонента
  const [initialHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      const currentHeight = window.innerHeight;
      if (initialHeight - currentHeight > 100) {
        setKeyboardOpen(true);
      } else {
        setKeyboardOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
        // Определяем, активна ли текущая вкладка
        const isActive = location.pathname === item.path;

        return (
          <Button
            key={item.id}
            onClick={() => navigate(item.path)}
            style={{
              flex: 1, // каждая вкладка занимает равное пространство
              backgroundColor: "transparent",
              border: "none",
              padding: "5px",
              borderRadius: "4px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.id === "users" ? (
              <UsersIcon
                width="24px"
                height="24px"
                fill={isActive ? "#0088cc" : "#000000"}
              />
            ) : (
              <Calendar
                width="24px"
                height="24px"
                fill={isActive ? "#0088cc" : "#000000"}
              />
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default NavigationBar;
