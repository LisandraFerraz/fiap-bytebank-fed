import { transacao } from "../../../utils/types";

export const handleDownloadFile = (data: transacao) => {
  if (!data.file) return;

  const matches = data.file.match(/^data:(.+);base64,/);
  if (!matches) {
    console.error("Base64 inválido");
    return;
  }

  const mimeType = matches[1];
  const extension = mimeType.split("/")[1];

  const link = document.createElement("a");
  link.href = data.file;
  link.download = `download.${extension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
