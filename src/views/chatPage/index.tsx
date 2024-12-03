import { useEffect, useRef, useState } from "react";
import { CornerDownLeft, Eraser, Loader, Trash } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import ChatDocument from "@/components/ChatDocuments";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { resetApp, setChat, setThreadId } from "@/store/ducks/chat";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { extractJsonObjects } from "@/utils/extractJsonResponse";
import { cleanResponse } from "@/utils/regex";
import { Button } from "@/components/ui/button";

const ChatPage = () => {
  const dispatch = useAppDispatch();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const historialChat = useAppSelector((state) => state.chat.chatHistory);
  const token = useAppSelector((state) => state.app.user.token);
  const threadId = useAppSelector((state) => state.chat.threadId);
  const filesCodeInterpreter = useAppSelector((state) => state.chat.filesCodeInterpreter);

  const [load, setLoad] = useState(false);
  const [input, setInput] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setMessages] = useState<string>("");

  const inputLength = input.trim().length;

  // scroll bottom with new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [historialChat]);

  // * Submit event stream chatbot
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoad(true);

    if (inputLength === 0) {
      setLoad(false);
      toast.warning("360 call!", {
        description: "Debe ingresar alguna pregunta",
        className: "toast-styles",
        action: {
          label: "Cerrar",
          onClick: () => {},
        },
      });
      return;
    }

    // Format object answer
    const newAnswer = {
      role: "user",
      content: input,
      threadId: threadId,
      id_file_download: "",
      filesCodeInterpreter: filesCodeInterpreter,
      id_image_download: "",
    };
    const newHistorial = [...historialChat, newAnswer];
    dispatch(setChat(newHistorial));

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API}/v1/api/ia/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newHistorial),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let text = "";
      if (reader) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          text += decoder.decode(value);
          const decodedObject = extractJsonObjects(text);
          setMessages(text);
          dispatch(setThreadId(decodedObject[decodedObject.length - 1]?.thread_id_openai));
          dispatch(
            setChat([
              ...newHistorial,
              {
                role: "assistant",
                id_file_download: decodedObject[decodedObject.length - 1]?.id_file_download,
                content: cleanResponse(decodedObject[decodedObject.length - 1]?.response),
                id_image_download: decodedObject[decodedObject.length - 1].id_image_download,
              },
            ])
          );

          if (done) {
            setLoad(false);
            break;
          }
        }
      }
    } catch (error: any) {
      setLoad(false);
      toast.error("Error en interacción con el Chat", {
        description: error.response?.data.data.err || error.message || "Error desconocido",
        className: "toast-styles",
        action: {
          label: "Cerrar",
          onClick: () => {},
        },
      });
    }
  };

  return (
    <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
      <Badge variant="outline" className="absolute right-3 top-3">
        Chatbot
      </Badge>

      {/* Conversation */}
      <div className="flex-1 container-custom overflow-auto">
        <ChatDocument messagesEndRef={messagesEndRef} />
      </div>

      <form
        className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        x-chunk="dashboard-03-chunk-1"
        onSubmit={submit}
      >
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="Escribe aquí tu pregunta..."
          autoComplete="off"
          value={input}
          disabled={load}
          onChange={(event) => setInput(event.target.value)}
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center p-3 pt-0">
          <TooltipProvider delayDuration={50}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button disabled={load} variant="ghost" size="icon" type="button" onClick={() => setInput("")}>
                  <Eraser className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Limpiar Pregunta</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={50}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={load}
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => {
                    dispatch(resetApp());
                    toast.info("Chat reiniciado", {
                      description: "Lista de archivos seleccionados vacia",
                      className: "toast-styles",
                      action: {
                        label: "Cerrar",
                        onClick: () => {},
                      },
                    });
                  }}
                >
                  <Trash className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Limpiar Conversación y Selección</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button disabled={load} type="submit" size="sm" className="ml-auto gap-1.5">
            {load && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Enviar
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatPage;
