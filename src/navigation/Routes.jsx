import CoursesPage from "../pages/CoursesPage";
import UsersPage from "../pages/UsersPage";
import SchedulePage from "../pages/SchedulePage";
import SyrveysPage from "../pages/SyrveysPage";
import ProgressPage from "../pages/ProgressPage";
import CourseDetailPage from "../pages/courses/CourseDetailPage";
import TopicDetailPage from "../pages/courses/TopicDetailPage";

import { ROUTES } from "../navigation/routes";

import { Route, Routes } from "react-router-dom";

const AppRoutes = () => (
  <Routes>
    <Route index element={<CoursesPage />} />

    <Route path="/:courseId" element={<CourseDetailPage />} />
    <Route path="/:courseId/topics/:topicId" element={<TopicDetailPage />} />

    <Route path={ROUTES.USERS} element={<UsersPage />} />
    <Route path={ROUTES.SСHEDULE} element={<SchedulePage />} />
    <Route path={ROUTES.SURVEYS} element={<SyrveysPage />} />
    <Route path={ROUTES.PROGRESS} element={<ProgressPage />} />
  </Routes>
);

export default AppRoutes;
