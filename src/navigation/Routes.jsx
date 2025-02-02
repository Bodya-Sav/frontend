import SchedulePage from "../pages/SchedulePage";

import { ROUTES } from "../navigation/routes";

import { Route, Routes } from "react-router-dom";

const AppRoutes = () => (
  <Routes>
    <Route index element={<SchedulePage />} />
  </Routes>
);

export default AppRoutes;
