import { Paperclip } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import InputFile from "./inputLoad";

const UploadFiles = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Paperclip className="size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-96"
        onInteractOutside={(e: { preventDefault: () => void }) => {
          e.preventDefault();
        }}
      >
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Adjuntar archivos</h4>
            <p className="text-sm text-muted-foreground">Tipos de archivo admitidos: .docx, .pdf, .pptx, .txt, .mp3, .m4a, .xlsx, .csv</p>
            <p className="text-xs text-muted-foreground">Peso por archivo: {"<20 MB"}</p>
          </div>

          <div className="grid gap-2 pt-3">
            <div className="grid grid-cols items-center gap-4">
              <InputFile />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UploadFiles;
