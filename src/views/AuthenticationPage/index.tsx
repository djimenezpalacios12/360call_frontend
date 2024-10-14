import { HandCoins } from "lucide-react";

import Login from "./login";
import "./styles.css";

export default function AuthenticationPage() {
  return (
    <>
      {/* bg-gradient-to-b from-neutral-950 to-neutral-900 */}
      <div className="container relative h-lvh min-w-full flex-col items-center justify-center md:grid lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 container-background" />
          <div className="relative z-20 flex items-center text-lg">
            <HandCoins className="mr-2" />
            Gestión 360
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Optimiza tus finanzas con la inteligencia artificial que transforma datos en decisiones inteligentes. ¡Gestiona tu futuro
                financiero con precisión y confianza!.&rdquo;
              </p>
              <footer className="text-sm">Gestión 360</footer>
            </blockquote>
          </div>
        </div>

        <div className="px-10 w-full">
          <div className="mx-auto h-lvh flex w-full flex-col justify-center align-middle space-y-6">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}
