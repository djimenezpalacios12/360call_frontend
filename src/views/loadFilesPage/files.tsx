import { useState } from "react";

import InputFile from "@/components/uploadFiles/inputLoad";
import { FileIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const LoadFilesPage = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Handle remove files
  const removeFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-start-1 col-end-13">
        <div className="space-y-2 flex justify-center text-center">
          <div>
            <h4 className="font-medium leading-none">Adjuntar archivos</h4>
            <p className="text-sm text-muted-foreground">Tipos de archivo admitidos: .docx, .pdf, .pptx, .txt, .mp3, .m4a, .xlsx, .csv</p>
            <p className="text-xs text-muted-foreground">Peso por archivo: {"<20 MB"}</p>
          </div>
        </div>
      </div>
      <div className="col-start-1 col-end-13">
        <div className="flex justify-center">
          <InputFile selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
        </div>
      </div>
      {selectedFiles.length > 0 && (
        <div className="col-start-1 col-end-13 max-h-[400px] overflow-auto">
          <h3 className="text-xs font-semibold mb-2">Archivos Seleccionados:</h3>
          <Card className="grid grid-cols-12 gap-2 p-4">
            {selectedFiles.map((file, index) => {
              return (
                <div className="col-span-3 border flex justify-between items-center p-2 rounded-lg">
                  <FileIcon size={24} className="mr-2" />
                  <span className="text-xs ">{file.name}</span>
                  <Button variant="ghost" size="icon" onClick={() => removeFile(index)} aria-label="Eliminar archivo">
                    <XIcon className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </Card>
        </div>
      )}
    </div>
  );
};

export default LoadFilesPage;
