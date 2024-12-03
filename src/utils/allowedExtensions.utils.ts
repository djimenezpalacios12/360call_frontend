import { toast } from "sonner";

export const allowedExtensions: string[] = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
  "text/plain",
  "application/pdf",
  "audio/mpeg",
  "audio/x-m4a",
];

export const allowedExtensionsInput: string = ".pdf, .docx, .pptx, .csv, .xlsx, .txt, .mp3, .m4a";

// Validate max size audio
export const validateMaxAudioSize = (selectedFiles: File[], setload: any) => {
  selectedFiles.forEach((file) => {
    if (file.type === "audio/mpeg" && +(file.size / 1048576).toFixed(2) > +import.meta.env.VITE_REACT_SIZE_AUDIO_MAX) {
      setload(false);
      toast.warning("Error al cargar archivos", {
        description: `Alguno de los archivos de audio cargados supera los ${import.meta.env.VITE_REACT_SIZE_AUDIO_MAX} MB`,
        className: "toast-styles",
        action: {
          label: "Cerrar",
          onClick: () => {},
        },
      });
      return;
    }
  });
};
