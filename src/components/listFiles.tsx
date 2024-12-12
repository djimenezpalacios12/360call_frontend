import { useEffect, useState } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// import { useGetFiles } from "@/hooks/useGetFiles";
import { FilesUser } from "@/interfaces/files.interfaces";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFileCodeInterpreter, setFilesSearch } from "@/store/ducks/chat";

const ListFiles = () => {
  const dispatch = useAppDispatch();

  const filesCodeInterpreter = useAppSelector((state) => state.chat.filesCodeInterpreter);
  const filesSearch = useAppSelector((state) => state.chat.filesSearch);

  // ! prototype
  const [loading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedFilesSearch, setSelectedFilesSearch] = useState<string[]>([]);

  // ! prototype
  // const files = useGetFiles(setLoading, open);
  const files = [
    {
      file_id: "assistant-aYPCTXJ2Md4h90aBlpdZRi5O",
      file_name: "Contrato Prestación de Servicios de Consultoria_Unificados-1-2",
    },
  ];

  // Manejar selección de archivos
  const handleSelect = (fileId: string, fileName: string) => {
    const extensionsForInterpreter = [".xlsx", ".csv"];
    const extensionsForSearch = [".pdf", ".docx", ".txt", ".pptx"];

    if (extensionsForInterpreter.some((ext) => fileName.endsWith(ext))) {
      setSelectedFiles((prevSelected) => (prevSelected.includes(fileId) ? prevSelected.filter((id) => id !== fileId) : [...prevSelected, fileId]));
    }

    if (extensionsForSearch.some((ext) => fileName.endsWith(ext))) {
      setSelectedFilesSearch((prevSelected) =>
        prevSelected.includes(fileName) ? prevSelected.filter((id) => id !== fileName) : [...prevSelected, fileName]
      );
    }
  };

  // Guardar archivos en Redux store
  useEffect(() => {
    dispatch(setFileCodeInterpreter(selectedFiles));
  }, [dispatch, selectedFiles]);

  useEffect(() => {
    dispatch(setFilesSearch(selectedFilesSearch));
  }, [dispatch, selectedFilesSearch]);

  // Limpiar selección al reiniciar chat
  useEffect(() => {
    if (filesCodeInterpreter.length === 0) {
      setSelectedFiles([]);
    }
  }, [filesCodeInterpreter.length]);

  useEffect(() => {
    if (filesSearch.length === 0) {
      setSelectedFilesSearch([]);
    }
  }, [filesSearch.length]);

  return (
    <div className="self-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
            seleccionar archivos...
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Listado Archivos" />
            <CommandList>
              <CommandEmpty>Sin coincidencias</CommandEmpty>
              <CommandGroup>
                <>
                  {loading ? (
                    <div className="flex items-center justify-center mt-4">
                      <Loader2 size={16} className="animate-spin mr-3" />
                      <span className="text-xs">Cargando...</span>
                    </div>
                  ) : (
                    <>
                      {files.map((file: FilesUser) => (
                        <CommandItem
                          className="w-full text-ellipsis text-nowrap overflow-hidden whitespace-nowrap p-1"
                          key={file.file_id}
                          value={file.file_name}
                          onSelect={() => handleSelect(file.file_id, file.file_name)}
                        >
                          <div className="w-full flex justify-start items-center">
                            {(selectedFiles.includes(file.file_id) || selectedFilesSearch.includes(file.file_name)) && (
                              <Check size={16} className="text-yellow-500 mr-2" />
                            )}
                            {file.file_name}
                          </div>
                        </CommandItem>
                      ))}
                    </>
                  )}
                </>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ListFiles;
