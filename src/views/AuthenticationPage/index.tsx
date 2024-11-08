import { useEffect } from "react";

import Login from "./login";
import "./styles.css";
import { useTheme } from "@/components/theme-provider";

export default function AuthenticationPage() {
  const { setTheme } = useTheme();

  // Set default theme
  useEffect(() => {
    setTheme("dark");
  }, []);

  return (
    <>
      <div className="container relative h-lvh min-w-full flex-col items-center justify-center md:grid lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 container-background" />
          <div className="relative z-20 flex items-center text-lg">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">360 Innova</h4>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-md">
                <blockquote className="mt-6 border-l-2 pl-6 italic">
                  &ldquo;Lo que une todo esto es cómo se representan los datos, por lo que el aprendizaje de la representación se está volviendo más
                  central.&rdquo;
                </blockquote>
              </p>
              <footer className="text-sm text-center">Samy Bengio</footer>
            </blockquote>
          </div>
        </div>

        <div className="px-5 w-full">
          <div className="mx-auto h-lvh flex w-full flex-col justify-center align-middle space-y-6">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}
