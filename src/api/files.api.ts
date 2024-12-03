import client from "./index.file.api";

// get files from assistant
export const getFileAssistant = () => {
  return client.get("assistants/files");
};

// upload files in asistant
export const uploadFilesAssistant = (formData: any, header: any) => {
  return client.post("assistants/files", formData, header);
};
