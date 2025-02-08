import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@telegram-apps/telegram-ui";
import { AuthContext } from "../../context/AuthContext";

import { navItems } from "./navItems";

const NavigationBar = () => {
  const { isSuper, isAdmin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Определяем роль пользователя: если isSuper, то "super", если isAdmin, то "admin", иначе "user"
  const role = isSuper ? "super" : isAdmin ? "admin" : "user";

  // Отфильтровываем элементы, доступные для данной роли
  const filteredNavItems = navItems.filter((item) => item.roles.includes(role));

  // Отслеживание изменения высоты окна для определения открытия клавиатуры
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
        position: "fixed", // фиксированное позиционирование
        bottom: 0, // прижато к нижней части экрана
        left: 0,
        width: "100%", // занимает всю ширину экрана
        display: "flex",
        justifyContent: "space-around",
        padding: "10px",
        borderTop: "1px solid #ccc",
        backgroundColor: "#fff",
        zIndex: 1000,
      }}
    >
      {filteredNavItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Button
            key={item.id}
            onClick={() => navigate(item.path)}
            style={{
              flex: 1, // равное распределение пространства
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
