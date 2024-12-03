import client from "./index.api";

export const downloadFileIA = (idFile: string) => {
  return client.post(`/ia/download/file/${idFile}`);
};
