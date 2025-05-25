/* Verifica se existem objetos vazios com exceção do "descricao"
    Aplicavel para:
    - PIX
    - TED
*/
export const hasEmptyValues = (prtObj: any) => {
  for (let obj in prtObj) {
    if (
      (prtObj[obj] === null ||
        prtObj[obj] === "" ||
        prtObj[obj] === undefined ||
        prtObj[obj] < 1) &&
      obj !== "descricao"
    ) {
      return true;
    }
  }
  return false;
};
