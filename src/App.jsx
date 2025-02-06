import { useEffect } from "react";
import { AppRoot } from "@telegram-apps/telegram-ui";

import AppRoutes from "./navigation/Routes";
import NavigationBar from "./components/navigation/NavigationBar";
import { checkAuth } from "./services/AuthService";
import { AuthProvider } from "./context/AuthContext";

const webapp = window.Telegram.WebApp;

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    webapp.ready();
    const chat_id = webapp.initDataUnsafe.user.id;
    checkAuth(chat_id)
      .then((data) => {
        setIsAdmin(data.result.isadmin);
        setIsAuth(data.result.isauth);
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
      <AuthProvider>
        <AppRoot>
          {isAuth ? (
            <>
              <AppRoutes />

              <NavigationBar />
            </>
          ) : (
            <h1>Дождитесь подтверждения регистрации</h1>
          )}
        </AppRoot>
      </AuthProvider>
    </>
  );
}

export default App;
