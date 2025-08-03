import { isAmountInvalid } from "./valor-validate";

export const isPixFormInvalid = (authObj: any) => {
  for (let obj in authObj) {
    if (
      (obj === "valor" && isAmountInvalid(authObj[obj])) ||
      (obj === "chavePix" && authObj[obj] && authObj[obj].length < 6) ||
      (obj === "destinatario" && authObj[obj] && authObj[obj]?.length < 3) ||
      (obj === "descricao" && authObj[obj] && authObj[obj]?.length < 3)
    ) {
      return true;
    }
  }
  return false;
};
