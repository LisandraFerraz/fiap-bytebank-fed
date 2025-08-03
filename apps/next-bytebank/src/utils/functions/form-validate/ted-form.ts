import { isAmountInvalid } from "./valor-validate";

export const isTedFormInvalid = (authObj: any) => {
  for (let obj in authObj) {
    if (
      (obj === "valor" && isAmountInvalid(authObj[obj])) ||
      (obj === "cpfDestinatario" && authObj[obj] && authObj[obj].length < 11) ||
      (obj === "numConta" && authObj[obj] && String(authObj[obj]).length < 6) ||
      (obj === "agencia" && authObj[obj] && authObj[obj].length < 3) ||
      (obj === "descricao" && authObj[obj] && authObj[obj]?.length < 3)
    ) {
      return true;
    }
  }
  return false;
};
