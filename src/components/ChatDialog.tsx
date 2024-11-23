import React, { useEffect, useState } from "react";
import { CircleUserRound, Copy, CopyCheck } from "lucide-react";
import { toast } from "sonner";
import { Remarkable } from "remarkable";
import { AxiosResponse } from "axios";

import { useTheme } from "./theme-provider";
import { downloadFileIA } from "@/api/chatbot.api";
import { copyTextInClipBoard } from "@/utils/copy";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChatBot, RetrieveFileIA } from "@/interfaces/chat.interfaces";
import th from "../assets/bot-message-square.svg";
import "../styles/chatDialog.css";

const ChatDialog: React.FC<ChatBot> = ({ content, role, id_file_download, id_image_download }) => {
  const md = new Remarkable();
  const { theme } = useTheme();
  const [copy, setCopy] = useState(false);
  const [string64, setstring64] = useState<string>("");

  // Download document generated for IA
  useEffect(() => {
    const links = document.querySelectorAll(".markdown a");
    const handleLinkClick = (event: any) => {
      event.preventDefault();
      if (id_file_download) {
        downloadFileIA(id_file_download)
          .then((data: AxiosResponse<RetrieveFileIA>) => {
            const base64String = data.data.file;
            const filename = data.data.filename;
            // Crear un enlace para descargar el archivo
            const link = document.createElement("a");
            link.href = `data:${data.data.mimeTypes};base64,${base64String}`;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .catch(() => {
            toast.error("Error en la descarga del archivo", {
              className: "toast-styles",
              action: {
                label: "Cerrar",
                onClick: () => {},
              },
            });
          });
      }
    };

    links.forEach((link: any) => {
      link.addEventListener("click", handleLinkClick);
    });

    return () => {
      links.forEach((link: any) => {
        link.removeEventListener("click", handleLinkClick);
      });
    };
  }, [id_file_download]);

  // Download image generated for IA
  useEffect(() => {
    if (id_image_download) {
      downloadFileIA(id_image_download)
        .then((data: AxiosResponse<RetrieveFileIA>) => {
          const base64String = data.data.file;
          setstring64(base64String);
        })
        .catch(() => {
          toast.error("Error en la descarga de la imagen", {
            className: "toast-styles",
            action: {
              label: "Cerrar",
              onClick: () => {},
            },
          });
        });
    }
  }, [id_image_download]);

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {role === "user" ? (
            <CircleUserRound size={32} strokeWidth={0.95} className="mr-2 font-thin" />
          ) : (
            <img src={th} alt="Logo 360 Call" width={"30px"} className="mr-2" />
          )}
          <div className="font-bold">{role === "user" ? "Usuario" : "Asistente"}</div>
        </div>
      </div>

      <div className="ml-9 mb-8 text-[15px]">
        <div
          className="markdown prose max-w-none w-full 
                   text-neutral-900 dark:text-neutral-200 
                   prose-headings:text-neutral-900 dark:prose-headings:text-neutral-200
                   prose-a:text-blue-600 dark:prose-a:text-blue-400
                   prose-strong:text-neutral-900 dark:prose-strong:text-neutral-200
                   prose-em:text-neutral-900 dark:prose-em:text-neutral-200
                   prose-blockquote:text-neutral-600 dark:prose-blockquote:text-neutral-400
                   prose-ol:marker:text-neutral-900 dark:prose-ol:marker:text-neutral-200
                   prose-ul:marker:text-neutral-900 dark:prose-ul:marker:text-neutral-200
                   prose-code:text-red-600 dark:prose-code:text-red-400
                   prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
                   prose-th:bg-neutral-200 dark:prose-th:bg-neutral-800
                   prose-td:bg-neutral-100 dark:prose-td:bg-neutral-900
                   prose-table:border-neutral-300 dark:prose-table:border-neutral-600"
          dangerouslySetInnerHTML={{
            __html: md.render(content),
          }}
        />

        {string64 && (
          <div className="p-4 m-4 mx-auto">
            <img src={`data:image/png;base64,${string64}`} alt="chart GPT" width={"90%"} />
          </div>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="mt-3 hover:cursor-pointer"
                onClick={() => {
                  copyTextInClipBoard(content);
                  setCopy(true);
                  setTimeout(() => setCopy(false), 2000);
                }}
              >
                {copy ? (
                  <CopyCheck size={18} strokeWidth={1.3} className={cn(theme === "dark" ? "text-neutral-300" : "text-neutral-900")} />
                ) : (
                  <Copy size={16} strokeWidth={1} className={cn(theme === "dark" ? "text-neutral-300" : "text-neutral-900")} />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copiar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
};

export default ChatDialog;
