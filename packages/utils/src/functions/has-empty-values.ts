import { isEmailValid } from "./validate-regex";

export const hasEmptyValues = (prtObj: any) => {
  for (let obj in prtObj) {
    if (
      prtObj[obj] === null ||
      prtObj[obj] === "" ||
      prtObj[obj] === undefined ||
      prtObj[obj] < 1
    ) {
      return true;
    }
  }
  return false;
};

export const isAuthFormInvalid = (authObj: any) => {
  for (let obj in authObj) {
    if (
      hasEmptyValues(authObj) ||
      (obj === "email" && !isEmailValid(authObj[obj])) ||
      (obj === "password" && authObj[obj]?.length < 6) ||
      (obj === "dataNascimento" && authObj[obj]?.length < 8) ||
      (obj === "nome" && authObj[obj]?.length < 3) ||
      (obj === "numeroConta" && String(authObj[obj])?.length < 6) ||
      (obj === "cpf" && authObj[obj]?.length < 11) ||
      (obj === "agencia" && authObj[obj]?.length < 3)
    ) {
      return true;
    }
  }
  return false;
};

export const isValueEmpty = (value: any) => {
  if (value === null || value === "" || value === undefined || value < 1) {
    return true;
  }
  return false;
};
