import { useEffect } from "react";
import { WebApp } from "@twa-dev/sdk";

function App() {
  // useEffect(() => {
  //   // Инициализация Telegram Web App
  //   WebApp.ready();

  //   // Пример получения данных о пользователе
  //   const user = WebApp.initDataUnsafe.user;
  //   console.log(user);
  // }, []);

  return (
    <div>
      <h1>Hello, Telegram Mini App!</h1>
      <button onClick={() => WebApp.showAlert("Hello!")}>Click me</button>
    </div>
  );
}

export default App;
