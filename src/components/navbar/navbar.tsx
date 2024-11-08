import { Package2, PanelLeft, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { NavbarProps, Options } from "@/interfaces/navbar.interfaces";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ModeToggle, ModeToggleMobile } from "../mode-toggle";
import { options } from "./menu";

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Left Nav */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <a
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">360 Hipotecario</span>
          </a>
          {options.map((option: Options, index: number) => {
            return (
              <div key={index}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        onClick={() => navigate(option.url)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 hover:bg-accent"
                      >
                        {option.icon}
                        <span className="sr-only">{option.title}</span>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="right">{option.title}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            );
          })}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <ModeToggle />
        </nav>
      </aside>

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        {/* Header Nav */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background  sm:h-auto sm:border-0 sm:bg-transparent px-6 justify-between backdrop-blur-[2px]">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <a
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <span className="sr-only">360 Call</span>
                </a>
                {options.map((option: Options, index: number) => {
                  return (
                    <a
                      key={index}
                      onClick={() => navigate(option.url)}
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      {option.icon}
                      {option.title}
                    </a>
                  );
                })}
                <div className="flex items-center pl-1 text-muted-foreground hover:text-foreground border-none">
                  <ModeToggleMobile />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <p className="text-lg text-muted-foreground font-semibold">360 Hipotecario</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                <User />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled={true}>Opciones</DropdownMenuItem>
              <DropdownMenuItem disabled={true}>Soporte</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled={true}>Cerrar Sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">{children}</main>
      </div>
    </div>
  );
};

export default Navbar;
