import { useState, useEffect, useContext } from "react";
import { AppRoot } from "@telegram-apps/telegram-ui";

import AppRoutes from "./navigation/Routes";
import NavigationBar from "./components/navigation/NavigationBar";
import TopPanelComponent from "./components/top_panel/TopPanelComponent";

import { checkAuth } from "./services/AuthService";

import { useAuthStore } from "./context/useAuthStore";

const webapp = window.Telegram.WebApp;

function App() {
  const [loading, setLoading] = useState(true);
  const { setIsAuth, isauth, setIsAdmin, setIsSuper, setId } = useAuthStore();

  useEffect(() => {
    webapp.ready();
    const chat_id = webapp.initDataUnsafe.user.id;
    checkAuth(chat_id)
      .then((data) => {
        if (data.result.id === 1) setIsSuper(true);
        setIsAdmin(data.result.isAdmin);
        setIsAuth(data.result.isAuth);
        setId(data.result.id);
        setLoading(false);
      })
      .catch((error) => console.error("Ошибка авторизации:", error));
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        Загрузка...
      </div>
    );
  }

  return (
    <>
      <AppRoot>
        {isauth ? (
          <>
            <TopPanelComponent />
            {/* Добавляем отступ сверху, чтобы контент не скрывался под шапкой */}
            <div style={{ paddingTop: "70px" }}></div>
            <AppRoutes />

            <NavigationBar />
          </>
        ) : (
          <h1>Дождитесь подтверждения регистрации</h1>
        )}
      </AppRoot>
    </>
  );
}

export default App;
