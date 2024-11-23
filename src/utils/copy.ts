export const copyTextInClipBoard = (textoACopiar: string) => {
    navigator.clipboard.writeText(textoACopiar);
};
