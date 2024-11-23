import client from "./index.api";

export const downloadFileIA = (idFile: string) => {
  return client.post(`/assistant/download/file/${idFile}`);
};
