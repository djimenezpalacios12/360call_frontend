import { useState, useRef } from "react";
import { AxiosResponse } from "axios";
import { FileIcon, Loader2, XIcon } from "lucide-react";
import { toast } from "sonner";

import { allowedExtensionsInput, allowedExtensions } from "@/utils/allowedExtensions.utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InputFile() {
  const [load, setload] = useState<boolean>(false);
  const [enableBtn, setenableBtn] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle remove files
  const removeFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

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
          description: `Archivos no admitidos`,
          className: "toast-styles",
          action: {
            label: "Cerrar",
            onClick: () => {},
          },
        });
        return;
      }

      // Verify size by file (max. 20 mb)
      const sizeByFile = filesSizes.some((fileSize) => fileSize > 20);
      if (sizeByFile) {
        setSelectedFiles([]);
        setenableBtn(false);
        toast.error("Error en la carga de archivos", {
          description: `Tus achivos seleccionado superan el limite (20 MB)`,
          className: "toast-styles",
          action: {
            label: "Cerrar",
            onClick: () => {},
          },
        });
        return;
      }

      // ? Verify total size
      //   const totalSize = filesSizes.reduce((a, b) => a + b, 0);
      //   if (+totalSize > 20) {
      //     setSelectedFiles([]);
      //     setenableBtn(false);
      //     toast.error("Error en la carga de archivos", {
      //       description: `Limite carga superado. (${totalSize} MB)`,
      //       className: "toast-styles",
      //       action: {
      //         label: "Cerrar",
      //         onClick: () => {},
      //       },
      //     });
      //     return;
      //   }

      setenableBtn(true);
    }
  };

  // 2. Handle load files
  const handleFileUpload = () => {
    setload(true);
    const formData = new FormData();

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    // uploadFilesAssistant(formData, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // })
    //   .then((response: AxiosResponse<any>) => {
    //     setSelectedFiles([]);
    //     setload(false);
    //     toast.success("Archivos Cargados", {
    //       description: "",
    //       className: "toast-styles",
    //       action: {
    //         label: "Cerrar",
    //         onClick: () => {},
    //       },
    //     });
    //     return response.data;
    //   })
    //   .catch((error: any) => {
    //     console.log(error);
    //     setload(false);
    //     toast.error("Error al cargar archivos", {
    //       description: error.response.data.detail || "Error desconocido",
    //       className: "toast-styles",
    //       action: {
    //         label: "Cerrar",
    //         onClick: () => {},
    //       },
    //     });
    //   });
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

          {/* Files Selected */}
          {selectedFiles.length > 0 && (
            <div className="pt-4">
              <h3 className="text-xs font-semibold mb-2">Archivos Seleccionados:</h3>
              <ul className="space-y-1 max-h-96 overflow-auto">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="flex items-center justify-between p-2 rounded border-[1px] ">
                    <div className="flex items-center space-x-2 text-wrap">
                      <FileIcon size={16} />
                      <span className="text-xs ">{file.name}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFile(index)} aria-label="Eliminar archivo" disabled={load}>
                      <XIcon className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
