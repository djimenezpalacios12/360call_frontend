import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider";
import Routing from "./routing";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
