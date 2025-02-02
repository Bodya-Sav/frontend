import AppRoutes from "./navigation/Routes";
import { AppRoot } from "@telegram-apps/telegram-ui";

function App() {
  return (
    <>
      <AppRoot>
        <AppRoutes />
      </AppRoot>
    </>
  );
}

export default App;
