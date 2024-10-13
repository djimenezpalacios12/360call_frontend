import { ThemeProvider } from "@/components/theme-provider";
// import { ModeToggle } from "@/components/mode-toggle";
import AuthenticationPage from "./views/AuthenticationPage";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <ModeToggle /> */}
      <AuthenticationPage />
    </ThemeProvider>
  );
}

export default App;
