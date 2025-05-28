import styles from "./loan-list.module.scss";
import { useState } from "react";
import { IEmprestimo } from "../../utils/interfaces/transaction";
import { BtnClasses, Button } from "@components/button/button";
import { LoanModal } from "@components/loan-modal/loan-modal";
import { UseLoans } from "../../utils/hooks/useLoans";

interface ILoan {
  data: IEmprestimo[];
}

export const LoanPendingList = ({ data }: ILoan) => {
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
        {data.map((item: IEmprestimo, index) => (
          <div key={index} className={styles.list_item}>
            <div>
              <h4>A pagar</h4>
              <p>Aberto em {item.data}</p>
              <p>{item.valorDevido}</p>
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
