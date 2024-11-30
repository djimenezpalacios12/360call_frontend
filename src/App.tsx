import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider";
import AuthenticationPage from "./views/AuthenticationPage";
import { configureClient } from "./api/index.api";
import { configureClientFiles } from "./api/index.file.api";
import { useAppSelector } from "./store/hooks";
import Routing from "./routing";
import "./App.css";

function App() {
  const token = useAppSelector((state) => state.app.user.token);
  configureClient(token);
  configureClientFiles(token);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>{token ? <Routing /> : <AuthenticationPage />}</BrowserRouter>

      <Toaster position="bottom-left" />
    </ThemeProvider>
  );
}

export default App;
