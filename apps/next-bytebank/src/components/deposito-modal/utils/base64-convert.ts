export function toBase64(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      // TO-DO: mensagem de erro
      reject(error);
    };
  });
}
