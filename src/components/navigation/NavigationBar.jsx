// import React, { useState, useEffect, useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Button } from "@telegram-apps/telegram-ui";
// import { ROUTES } from "../../navigation/routes";

// import { AuthContext } from "../../context/AuthContext";

// import UsersIcon from "../../assets/icons/users.svg";
// import Calendar from "../../assets/icons/calendar-date.svg";

// // Массив с описанием вкладок (страниц)
// const navItems = [
//   { id: "users", label: "Пользователи", path: ROUTES.USERS },
//   { id: "schedule", label: "Расписание", path: ROUTES.SHEDULE },
// ];

// const NavigationBar = () => {
//   const { isAdmin } = useContext(AuthContext);
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Флаг, показывающий, открыта ли клавиатура (на основе изменения высоты окна)
//   const [keyboardOpen, setKeyboardOpen] = useState(false);
//   // Фиксируем исходную высоту окна при монтировании компонента
//   const [initialHeight] = useState(window.innerHeight);

//   useEffect(() => {
//     const handleResize = () => {
//       const currentHeight = window.innerHeight;
//       if (initialHeight - currentHeight > 100) {
//         setKeyboardOpen(true);
//       } else {
//         setKeyboardOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [initialHeight]);

//   // Если клавиатура открыта, не отображаем панель
//   if (keyboardOpen) return null;

//   return (
//     <div
//       style={{
//         position: "fixed", // фиксированное позиционирование
//         bottom: 0, // прижато к нижней части экрана
//         left: 0, // прижато к левому краю
//         width: "100%", // занимает всю ширину экрана
//         display: "flex",
//         justifyContent: "space-around",
//         padding: "10px",
//         borderTop: "1px solid #ccc",
//         backgroundColor: "#fff",
//         zIndex: 1000, // чтобы панель была поверх прочего контента
//       }}
//     >
//       {navItems.map((item) => {
//         // Если элемент с id "users" и пользователь не является админом — не рендерим кнопку
//         if (item.id === "users" && !isAdmin) {
//           return null;
//         }
//         // Определяем, активна ли текущая вкладка
//         const isActive = location.pathname === item.path;

//         return (
//           <div
//             style={{
//               position: "fixed", // фиксированное позиционирование
//               bottom: 0, // прижато к нижней части экрана
//               left: 0,
//               width: "100%", // занимает всю ширину
//               display: "flex",
//               justifyContent: "space-around",
//               padding: "10px",
//               borderTop: "1px solid #ccc",
//               backgroundColor: "#fff",
//               zIndex: 1000,
//             }}
//           >
//             {navItems.map((item) => {
//               // Если элемент с id "users" и пользователь не админ, не рендерим кнопку
//               if (item.id === "users" && !isAdmin) {
//                 return null;
//               }
//               const isActive = location.pathname === item.path;
//               // Выбираем URL иконки
//               const iconUrl = item.id === "users" ? UsersIcon : Calendar;

//               return (
//                 <Button
//                   key={item.id}
//                   onClick={() => navigate(item.path)}
//                   style={{
//                     flex: 1, // равное распределение пространства
//                     backgroundColor: "transparent",
//                     border: "none",
//                     padding: "5px",
//                     borderRadius: "4px",
//                     height: "40px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: "30px",
//                       height: "2430pxpx",
//                       backgroundColor: isActive ? "#0088cc" : "#000000",
//                       // Используем CSS-маску, чтобы отобразить внешний вид иконки
//                       mask: `url(${iconUrl}) no-repeat center`,
//                       WebkitMask: `url(${iconUrl}) no-repeat center`,
//                       maskSize: "contain",
//                       WebkitMaskSize: "contain",
//                     }}
//                   />
//                 </Button>
//               );
//             })}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default NavigationBar;

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
              fontSize: "24px",
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
