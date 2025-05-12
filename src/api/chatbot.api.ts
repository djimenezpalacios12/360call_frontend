import client from "./index.users.api";

export const downloadFileIA = (idFile: string) => {
  return client.post(`/ia/download/file/${idFile}`);
};
