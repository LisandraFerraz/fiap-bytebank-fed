import styles from "./loan-list.module.scss";
import { useState } from "react";
import { IEmprestimo } from "../../utils/interfaces/transaction";
import { BtnClasses, Button } from "@components/button/button";
import { LoanModal } from "@components/loan-modal/loan-modal";
import { UseLoans } from "../../utils/hooks/useLoans";
import { FormatDateSlash } from "../../utils/functions/format-date";

interface ILoan {
  data: IEmprestimo[];
}

export const LoanList = ({ data }: ILoan) => {
  const { payLoan } = UseLoans();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IEmprestimo>();

  const handlePayLoan = (item: IEmprestimo) => {
    const dateToday = new Date();

    const body: IEmprestimo = {
      ...item,
      data: String(dateToday),
      valorPago: 50,
    };

    payLoan(body);
  };

  const handleModal = (data: IEmprestimo) => {
    setIsOpen(true);
    setModalData(data);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    // setTimeout(() => {
    // }, 300);
  };

  return (
    <>
      <div className={styles.pending_list}>
        {data?.map((item: IEmprestimo, index) => (
          <div key={index} className={styles.list_item}>
            <div>
              {item.aberto ? <h4>A pagar</h4> : <h4>Pago</h4>}
              <p>Aberto em {FormatDateSlash(item.data)}</p>
              <p>
                R${" "}
                {item.aberto ? (
                  <span>{item.valorDevido}</span>
                ) : (
                  <span>{item.valor}</span>
                )}{" "}
              </p>
            </div>
            {item.aberto && (
              <Button
                text="Registrar pagamento"
                click={() => handleModal(item)}
                btnClass={BtnClasses.DEFAULT}
              />
            )}
          </div>
        ))}
      </div>
      {isOpen && modalData && (
        <LoanModal onClose={handleCloseModal} data={modalData} />
      )}
    </>
  );
};
