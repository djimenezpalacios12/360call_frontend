import { Calculator } from "lucide-react";

import { Options } from "@/interfaces/navbar.interfaces";

export const options: Options[] = [
  {
    title: "Simulador",
    icon: <Calculator className="h-5 w-5" />,
    url: "/simulator",
  },
];
