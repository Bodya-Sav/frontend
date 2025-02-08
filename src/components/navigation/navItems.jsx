import {
  BiUser,
  BiCalendar,
  BiBookBookmark,
  BiConversation,
  BiLineChart,
} from "react-icons/bi";

import { ROUTES } from "../../navigation/routes";

export const navItems = [
  {
    id: "users",
    label: "Пользователи",
    path: ROUTES.USERS,
    icon: <BiUser />,
    roles: ["super", "admin"], // доступны супер и админам
  },
  {
    id: "schedule",
    label: "Расписание",
    path: ROUTES.SСHEDULE, // убедитесь, что ROUTES.SCHEDULE определён
    icon: <BiCalendar />,
    roles: ["admin", "user"], // доступны админам и обычным пользователям
  },
  {
    id: "courses",
    label: "Курсы",
    path: ROUTES.COURSES, // убедитесь, что ROUTES.COURSES определён
    icon: <BiBookBookmark />,
    roles: ["super", "admin", "user"], // доступны всем
  },
  {
    id: "surveys",
    label: "Опросы",
    path: ROUTES.SURVEYS, // определите в ROUTES
    icon: <BiConversation />,
    roles: ["admin", "user"], // доступны админам и пользователям
  },
  {
    id: "progress",
    label: "Прогресс",
    path: ROUTES.PROGRESS, // определите в ROUTES
    icon: <BiLineChart />,
    roles: ["user"], // доступны только обычным пользователям
  },
];
