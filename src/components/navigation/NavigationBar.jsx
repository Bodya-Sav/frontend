import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@telegram-apps/telegram-ui";
import { ROUTES } from "../../navigation/routes";

// Массив с описанием вкладок (страниц)
const navItems = [
  { id: "schedule", label: "Расписание", path: ROUTES.SHEDULE },
  { id: "users", label: "Пользователи", path: ROUTES.USERS },
  // В будущем можно добавить другие страницы, например:
  // { id: 'profile', label: 'Профиль', path: ROUTES.PROFILE },
];

const NavigationBar = () => {
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
        // Определяем, активна ли текущая вкладка и начинается ли текущий путь с заданного значения
        const isActive = location.pathname === item.path;

        return (
          <Button
            key={item.id}
            onClick={() => navigate(item.path)}
            style={{
              backgroundColor: isActive ? "#0088cc" : "#fff",
              color: isActive ? "#fff" : "#000",
              padding: "8px 12px",
              borderRadius: "4px",
              height: "40px",
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </div>
  );
};

export default NavigationBar;
