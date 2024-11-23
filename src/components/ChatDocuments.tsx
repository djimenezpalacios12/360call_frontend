import { CardContent } from "./ui/card";
import { useAppSelector } from "@/store/hooks";
import th from "../assets/bot-message-square.svg";
import { ChatBot, TabsChatDocumentProps } from "@/interfaces/chat.interfaces";
import ChatDialog from "./ChatDialog";

const ChatDocument: React.FC<TabsChatDocumentProps> = ({ messagesEndRef }) => {
  const chat = useAppSelector((state) => state.chat.chatHistory);

  return (
    <CardContent className="overflow-auto my-4 py-4 md:p-5 p-1">
      <div className="grid grid-cols-4 gap-4">
        <div className="flex items-center justify-between mb-8 col-span-4">
          <div className="flex items-start justify-start">
            <img src={th} alt="Logo 360 Call" width={"30px"} className="mr-2" />
            <div>
              <div className="font-bold text-left">360 Call</div>
              <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">Realiza las consultas para obtener información</p>
            </div>
          </div>
        </div>

        {chat.map((message: ChatBot, index: number) => (
          <div className="col-span-12 text-left items-start" key={index} ref={messagesEndRef}>
            <ChatDialog
              role={message.role}
              content={message.content}
              id_file_download={message.id_file_download}
              id_image_download={message.id_image_download}
            />
          </div>
        ))}
      </div>
    </CardContent>
  );
};

export default ChatDocument;
