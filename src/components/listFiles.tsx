import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { useGetFiles } from "@/hooks/useGetFiles";
import { FilesUser } from "@/interfaces/files.interfaces";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const ListFiles = () => {
  const [_, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);

  const files = useGetFiles(setLoading, open);

  const handleSelect = (fileId: string) => {
    if (selectedFileIds.includes(fileId)) {
      setSelectedFileIds((prev) => prev.filter((id) => id !== fileId));
    } else if (selectedFileIds.length < 2) {
      setSelectedFileIds((prev) => [...prev, fileId]);
    }
  };

  return (
    <div className="self-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
            {selectedFileIds.length > 0
              ? files
                  .filter((file) => selectedFileIds.includes(file.file_id))
                  .map((file) => file.file_name)
                  .join(", ")
              : "seleccionar archivos..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Listado Archivos" />
            <CommandList>
              <CommandEmpty>Sin coincidencias</CommandEmpty>
              <CommandGroup>
                {files.map((file: FilesUser, index: number) => {
                  return (
                    <CommandItem key={index} onSelect={() => handleSelect(file.file_id)} className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {file.file_name}
                      <Check className={cn("ml-auto", selectedFileIds.includes(file.file_id) ? "opacity-100" : "opacity-0")} />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ListFiles;
