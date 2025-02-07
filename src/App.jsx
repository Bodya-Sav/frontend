import { useState, useEffect, useContext } from "react";
import { AppRoot } from "@telegram-apps/telegram-ui";

import AppRoutes from "./navigation/Routes";
import NavigationBar from "./components/navigation/NavigationBar";
import { checkAuth } from "./services/AuthService";

import { AuthContext } from "./context/AuthContext";

const webapp = window.Telegram.WebApp;

function App() {
  const [loading, setLoading] = useState(true);
  const { setIsAuth, isauth, setIsAdmin, setChatId } = useContext(AuthContext);

  useEffect(() => {
    webapp.ready();
    const chat_id = webapp.initDataUnsafe.user.id;
    setChatId(chat_id);
    checkAuth(chat_id)
      .then((data) => {
        setIsAdmin(data.result.isAdmin);
        setIsAuth(data.result.isAuth);
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
