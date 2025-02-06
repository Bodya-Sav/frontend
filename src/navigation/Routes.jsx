import SchedulePage from "../pages/SchedulePage";
import UsersPage from "../pages/UsersPage";

import { ROUTES } from "../navigation/routes";

import { Route, Routes } from "react-router-dom";

const AppRoutes = () => (
  <Routes>
    <Route index element={<SchedulePage />} />

    <Route path={ROUTES.USERS} element={<UsersPage />} />
  </Routes>
);

export default AppRoutes;
