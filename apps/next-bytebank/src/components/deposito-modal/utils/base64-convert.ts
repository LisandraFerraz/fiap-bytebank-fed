import { useToast } from "../../../utils/hooks/context-hooks/useToast";

export function toBase64(file: File) {
  const { showToast } = useToast();

  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      showToast("error", "Ocorreu um erro ao fazer upload do arquivo.");
      reject(error);
    };
  });
}
