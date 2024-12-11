export interface ChatBot {
  role: string;
  content: string;
  id_file_download: string;
  id_image_download: string;
}

export interface TabsChatDocumentProps {
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export interface ChatStore {
  chatHistory: ChatBot[];
  threadId: string;
  filesCodeInterpreter: string[];
  filesSearch: string[];
}

export interface RetrieveFileIA {
  file: string;
  filename: string;
  mimeTypes: string;
}
