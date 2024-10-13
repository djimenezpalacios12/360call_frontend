import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Gestion 360</h4>
    </ThemeProvider>
  );
}

export default App;
