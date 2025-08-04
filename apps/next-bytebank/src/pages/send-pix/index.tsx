import styles from "./../../styles/page-form.module.scss";
import { Button, InputText } from "@bytebank/ui";
import { useEffect, useState } from "react";
import {
  IPix,
  TransacationTypes,
  TransPeriod,
} from "../../utils/interfaces/transaction";
import { UsePix } from "../../utils/hooks/usePix";
import { FormatDate } from "../../utils/functions/format-date";
import { BtnClasses } from "../../utils/types";
import { currencyBlocks } from "@bytebank/utils";
import { isPixFormInvalid } from "../../utils/functions/form-validate/pix-form";
import { isAmountInvalid } from "../../utils/functions/form-validate/valor-validate";
import { Transaction } from "@components/transaction/transaction";
import { Paginator } from "@components/paginator/paginator";
import { Pagination } from "../../utils/interfaces/pagination";
import { UseAccount } from "../../utils/hooks/useAccount";
import { useToast } from "../../utils/hooks/context-hooks/useToast";
import { useLoader } from "../../utils/hooks/context-hooks/useLoader";
import { Title } from "@components/title-text/title-text";
import { errorResponse } from "../../utils/functions/api-res-treatment";
import { v4 as generateUID } from "uuid";

export default function SendPix() {
  const { sendPix } = UsePix();
  const { getAccountDetails } = UseAccount();

  const { showLoader, hideLoader } = useLoader();
  const { showToast } = useToast();

  const [pixBody, setPixBody] = useState<IPix>({
    chavePix: "",
    descricao: "",
    valor: null,
    data: "",
    tipo: TransacationTypes.PIX,
    destinatario: "",
  });
  const [pixList, setPixList] = useState<IPix[]>([]);
  const [pagination, setPagination] = useState<Pagination>(new Pagination());

  useEffect(() => {
    listPix(1);
  }, []);

  const updateBody = (key: string, value: string) => {
    const dateToday = new Date();

    setPixBody({
      ...pixBody,
      [key]: key === "valor" ? Number(value) : value,
      data: FormatDate(dateToday),
      transId: generateUID(),
    });
  };

  const handleSendPix = () => {
    if (!isPixFormInvalid(pixBody)) {
      showLoader();
      sendPix(pixBody).then((res: any) => {
        hideLoader();

        if (errorResponse(res)) return showToast("error", res?.message);
        listPix(1);
      });
    }
  };

  const listPix = async (page: number) => {
    showLoader();
    const data = await getAccountDetails(
      {
        transType: TransacationTypes.PIX,
        transPeriod: TransPeriod.RECENT,
      },
      { ...pagination, currentPage: page }
    );

    if (data) {
      const { transacoes } = data;
      setPixList(transacoes.transactions);
      hideLoader();
    } else {
      showToast("error", "Ocorreu um erro. Tente novamente.");
    }
    hideLoader();
  };

  return (
    <>
      <div className={styles.transaction_layout}>
        <Title size="lg" text="Registrar PIX" />

        <div className={styles.transaction_form}>
          <div className={styles.row}>
            <InputText
              value={pixBody.valor}
              onChange={(e) => updateBody("valor", e.target.value)}
              id="valor"
              label="Valor"
              mask="R$ currency"
              blocks={currencyBlocks}
              placeHolder="R$ 0.000"
              type="text"
              errorMsg={
                pixBody.valor && isAmountInvalid(pixBody.valor)
                  ? "- inválido"
                  : ""
              }
            />
            <InputText
              value={pixBody.chavePix}
              id="chavePix"
              onChange={(e) => updateBody("chavePix", e.target.value)}
              label="Chave PIX"
              placeHolder="Chave PIX"
              errorMsg={
                pixBody.chavePix && String(pixBody.chavePix).length < 6
                  ? "- insira mais de 6 dígitos"
                  : ""
              }
            />
          </div>

          <div className={styles.row}>
            <InputText
              value={pixBody.destinatario}
              id="destinatario"
              onChange={(e) => updateBody("destinatario", e.target.value)}
              label="Destinatário"
              placeHolder="Destinatário"
              errorMsg={
                pixBody.destinatario && String(pixBody.destinatario).length < 3
                  ? "- insira mais de 3 dígitos"
                  : ""
              }
            />
          </div>
          <div className={styles.row}>
            <InputText
              value={pixBody.descricao}
              id="descricao"
              onChange={(e) => updateBody("descricao", e.target.value)}
              label="descrição (opcional)"
              placeHolder="Descrição..."
              errorMsg={
                pixBody.descricao && String(pixBody.descricao).length < 3
                  ? "- insira mais de 3 dígitos"
                  : ""
              }
            />
          </div>

          <div className={styles.end_row}>
            <Button
              disabled={isPixFormInvalid(pixBody)}
              text="Confirmar"
              btnClass={BtnClasses.CONFIRM}
              click={handleSendPix}
            />
          </div>
        </div>
      </div>

      {pixList.length && (
        <div className={styles.transacions_list}>
          <Title size="base" text="Transações PIX recentes" />
          {pixList.map((dp: IPix, index) => (
            <div key={index} className={styles.list_items}>
              <Transaction
                refresh={() => listPix(pagination.currentPage)}
                dataT={dp}
                key={index}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
