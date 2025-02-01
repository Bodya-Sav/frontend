import ShedulePage from "../pages/ShedulePage";

import { ROUTES } from "../navigation/routes";

import { Route, Routes } from "react-router-dom";

const AppRoutes = () => (
  <Routes>
    <Route index element={<ShedulePage />} />
  </Routes>
);
