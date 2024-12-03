import { Loader2 } from "lucide-react";

interface PantallaDeCargaProps {
  mensaje?: string;
}

export default function LoaderScreen({ mensaje = "Por favor espere..." }: PantallaDeCargaProps) {
  return (
    <div className="fixed z-50 min-w-full min-h-full inset-0 flex flex-col items-center justify-center bg-neutral-950 bg-opacity-80">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-lg font-medium">{mensaje}</p>
    </div>
  );
}
