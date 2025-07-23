import { toBase64 } from "./base64-convert";

export async function uploadedFileSetter(file: File, setterFn: any, data: any) {
  if (file) {
    setterFn(file);
    const base64 = await toBase64(file as File);

    let body = { ...data, file: base64 };

    return body;
  }
  return;
}
