import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider";
import Login from "./views/AuthenticationPage/login";
import { configureClient } from "./api/index.api";
import { useAppSelector } from "./store/hooks";
import Routing from "./routing";
import "./App.css";

function App() {
  const token = useAppSelector((state) => state.app.user.token);
  configureClient(token);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>{token ? <Routing /> : <Login />}</BrowserRouter>

      <Toaster position="bottom-left" />
    </ThemeProvider>
  );
}

export default App;
