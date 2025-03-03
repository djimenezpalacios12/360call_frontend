import { useState } from "react";
import { Upload, BotMessageSquare } from "lucide-react";

import { Views } from "@/interfaces/navbar.interfaces";

export const useView = () => {
  const [views] = useState<Views[]>([
    {
      view: "Chat",
      URL: "/chat",
      icon: <BotMessageSquare className="h-4 w-4" />,
      access: ["super", "administrador", "usuario"],
    },
    {
      view: "Subir Archivos",
      URL: "/upload-files",
      icon: <Upload className="h-4 w-4" />,
      access: ["super", "administrador", "usuario"],
    },
  ]);

  return views;
};
