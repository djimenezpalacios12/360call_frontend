import { useState } from "react";
import { Upload } from "lucide-react";

import { Views } from "@/interfaces/navbar.interfaces";

export const dataOptions = {
  user: {
    name: "innova",
    email: "dev@360innova.cl",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Subir Archivos",
      url: "/upload-files",
      icon: Upload,
    },
  ],
};

export const useView = () => {
  const [views] = useState<Views[]>([
    {
      view: "Subir Archivos",
      URL: "/upload-files",
      icon: <Upload className="h-4 w-4" />,
      access: ["super", "administrador", "usuario"],
    },
  ]);

  return views;
};