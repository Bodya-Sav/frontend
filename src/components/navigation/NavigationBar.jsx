import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@telegram-apps/telegram-ui";
import { ROUTES } from "../../navigation/routes";
import { AuthContext } from "../../context/AuthContext";

// Импортируем иконки из react-icons (можно выбрать из множества наборов)
import { BiUser, BiCalendar } from "react-icons/bi";

// Массив с описанием вкладок
const navItems = [
  { id: "users", label: "Пользователи", path: ROUTES.USERS, icon: <BiUser /> },
  {
    id: "schedule",
    label: "Расписание",
    path: ROUTES.SHEDULE,
    icon: <BiCalendar />,
  },
];

const NavigationBar = () => {
  const { isAdmin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Отслеживание изменения высоты экрана для определения открытия клавиатуры
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [initialHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      const currentHeight = window.innerHeight;
      setKeyboardOpen(initialHeight - currentHeight > 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initialHeight]);

  if (keyboardOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        padding: "10px",
        borderTop: "1px solid #ccc",
        backgroundColor: "#fff",
        zIndex: 1000,
      }}
    >
      {navItems.map((item) => {
        if (item.id === "users" && !isAdmin) return null;
        const isActive = location.pathname === item.path;

        return (
          <Button
            key={item.id}
            onClick={() => navigate(item.path)}
            style={{
              flex: 1,
              backgroundColor: "transparent",
              border: "none",
              padding: "5px",
              borderRadius: "4px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "44px",
              color: isActive ? "#0088cc" : "#000000",
            }}
          >
            {item.icon}
          </Button>
        );
      })}
    </div>
  );
};

export default NavigationBar;
