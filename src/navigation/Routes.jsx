import CoursesPage from "../pages/CoursesPage";
import UsersPage from "../pages/UsersPage";
import SchedulePage from "../pages/SchedulePage";
import SyrveysPage from "../pages/SyrveysPage";
import ProgressPage from "../pages/ProgressPage";

import { ROUTES } from "../navigation/routes";

import { Route, Routes } from "react-router-dom";

const AppRoutes = () => (
  <Routes>
    <Route index element={<CoursesPage />} />

    <Route path={ROUTES.USERS} element={<UsersPage />} />
    <Route path={ROUTES.SHEDULE} element={<SchedulePage />} />
    <Route path={ROUTES.SURVEYS} element={<SyrveysPage />} />
    <Route path={ROUTES.PROGRESS} element={<ProgressPage />} />
  </Routes>
);

export default AppRoutes;
