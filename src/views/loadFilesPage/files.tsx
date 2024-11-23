import InputFile from "@/components/uploadFiles/inputLoad";

const LoadFilesPage = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div>
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
    </div>
  );
};

export default LoadFilesPage;
