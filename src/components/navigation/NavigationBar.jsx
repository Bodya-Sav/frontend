import React from "react";
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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "10px",
        borderTop: "1px solid #ccc",
        backgroundColor: "#fff",
        marginBottom: "0px",
      }}
    >
      {navItems.map((item) => {
        // Определяем, активна ли текущая вкладка и начинается ли текущий путь с заданного значения
        const isActive = location.pathname(item.path);

        return (
          <Button
            key={item.id}
            onClick={() => navigate(item.path)}
            style={{
              backgroundColor: isActive ? "#0088cc" : "#fff",
              color: isActive ? "#fff" : "#000",
              padding: "8px 12px",
              borderRadius: "4px",
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
