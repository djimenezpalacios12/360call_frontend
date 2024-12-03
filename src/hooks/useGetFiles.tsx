import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";

import { FilesUser } from "@/interfaces/files.interfaces";
import { ErrorResponseData } from "@/interfaces/Axios.interfaces";
import { getFileAssistant } from "@/api/files.api";

export const useGetFiles = (setLoading: React.Dispatch<React.SetStateAction<boolean>>, open: boolean) => {
  const [Files, setFiles] = useState<FilesUser[]>([
    {
      file_id: "",
      file_name: "",
    },
  ]);

  useEffect(() => {
    if (open === true) {
      setLoading(true);
      getFileAssistant()
        .then((response: AxiosResponse<FilesUser[]>) => {
          setFiles(response.data);
          setLoading(false);
        })
        .catch((error: AxiosError<ErrorResponseData>) => {
          setLoading(false);
          toast.error("Error consultar archivos", {
            description: error.response?.data.data.err || error.message || "Error desconocido",
            className: "toast-styles",
            action: {
              label: "Cerrar",
              onClick: () => {},
            },
          });
        });
    } else {
      return;
    }
  }, [open, setLoading]);

  return Files;
};
