import { useState, useRef } from "react";
import { AxiosResponse } from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { allowedExtensionsInput, allowedExtensions, validateMaxAudioSize } from "@/utils/allowedExtensions.utils";
import { useAppDispatch } from "@/store/hooks";
import { setLoading } from "@/store/ducks/state";
import { uploadFilesAssistant } from "@/api/files.api";

interface InputFileProps {
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const InputFile: React.FC<InputFileProps> = ({ selectedFiles, setSelectedFiles }) => {
  const dispatch = useAppDispatch();

  const [load, setload] = useState<boolean>(false);
  const [enableBtn, setenableBtn] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ...
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // 1. Handle selected files
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const filesSizes: number[] = [];
    const filesExtensions: string[] = [];

    if (files) {
      const filesArray: File[] = Array.from(files);

      // verify máx audio selectables
      let count = 0;
      filesArray.forEach((file) => {
        if (file.type === "audio/mpeg") {
          count += 1;
        }
      });
      if (count > +import.meta.env.VITE_REACT_AUDIO_SELECTABLES) {
        filesSizes.push(0);
        filesExtensions.push("");
        toast.warning("Error al seleccionar archivos", {
          description: "Seleccionar un máximo de 3 audios por carga",
          className: "toast-styles",
          action: {
            label: "Cerrar",
            onClick: () => {},
          },
        });
        return;
      }

      setSelectedFiles(Array.from(files));
      filesArray.forEach((file) => {
        filesSizes.push(+(file.size / 1048576).toFixed(2));
        filesExtensions.push(file.type);
      });

      // verify extensions
      const extensionDenied = filesExtensions.find((extension) => !allowedExtensions.includes(extension) || allowedExtensionsInput.includes(""));
      if (extensionDenied === "") {
        setSelectedFiles([]);
        setenableBtn(false);
        toast.error("Error en la carga de archivos", {
          description: "Archivos no admitidos",
          className: "toast-styles",
          action: {
            label: "Cerrar",
            onClick: () => {},
          },
        });
        return;
      }

      // ? Verify size by file (max. 20 mb)
      //   const sizeByFile = filesSizes.some((fileSize) => fileSize > 100);
      //   if (sizeByFile) {
      //     setSelectedFiles([]);
      //     setenableBtn(false);
      //     toast.error("Error en la carga de archivos", {
      //       description: Tus achivos seleccionado superan el limite (20 MB),
      //       className: "toast-styles",
      //       action: {
      //         label: "Cerrar",
      //         onClick: () => {},
      //       },
      //     });
      //     return;
      //   }

      // Verify total size
      const totalSize = filesSizes.reduce((a, b) => a + b, 0);
      if (+totalSize > +import.meta.env.VITE_REACT_SIZE_MAX) {
        setSelectedFiles([]);
        setenableBtn(false);
        toast.error("Error en la carga de archivos", {
          description: `Limite carga superado. (${totalSize} MB)`,
          className: "toast-styles",
          action: {
            label: "Cerrar",
            onClick: () => {},
          },
        });
        return;
      }

      setenableBtn(true);
    }
  };

  // 2. Handle load files
  const handleFileUpload = () => {
    setload(true);
    dispatch(setLoading(true));
    const formData = new FormData();

    // Validate max size audio
    validateMaxAudioSize(selectedFiles, setload);

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    uploadFilesAssistant(formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response: AxiosResponse<any>) => {
        setSelectedFiles([]);
        setload(false);
        // dispatch(setLoading(false));
        toast.success("Archivos Cargados", {
          description: "",
          className: "toast-styles",
          action: {
            label: "Cerrar",
            onClick: () => {},
          },
        });
        return response.data;
      })
      .catch((error: any) => {
        setload(false);
        dispatch(setLoading(false));
        console.log(error);
        toast.error("Error al cargar archivos", {
          description: error?.response?.data?.detail || "Error desconocido",
          className: "toast-styles",
          action: {
            label: "Cerrar",
            onClick: () => {},
          },
        });
      });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="p-2">
        <CardTitle className="text-md">Selector de Archivos</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <input
            key={Math.random()}
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
            accept={allowedExtensionsInput}
          />
          <Button variant="secondary" onClick={handleButtonClick} className="w-full" disabled={load}>
            Seleccionar Archivos
          </Button>

          {/* Load Button Component */}
          {enableBtn && selectedFiles.length > 0 && (
            <Button key={Math.random()} variant="default" onClick={handleFileUpload} className="w-full" disabled={load}>
              {load && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Cargar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InputFile;
