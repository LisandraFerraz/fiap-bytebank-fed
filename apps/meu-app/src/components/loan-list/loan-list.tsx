import styles from "./loan-list.module.scss";
import { useEffect, useState } from "react";
import {
  IEmprestimo,
  TransacationTypes,
} from "../../utils/interfaces/transaction";
import { BtnClasses, Button } from "@components/button/button";
import { UseTransactions } from "../../utils/hooks/useTransactions";
import { LoanModal } from "@components/loan-modal/loan-modal";

interface ILoan {
  data: IEmprestimo[];
}

export const LoanPendingList = ({ data }: ILoan) => {
  const { payLoan } = UseTransactions();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IEmprestimo>();

  const handlePayLoan = (item: IEmprestimo) => {
    const dateToday = new Date();

    const body: IEmprestimo = {
      ...item,
      data: String(dateToday),
      valorPago: 50,
    };

    payLoan("12345678901", body);
  };

  const handleModal = (data: IEmprestimo) => {
    setIsOpen(true);
    setModalData(data);
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
                text="Pagar"
                click={() => handleModal(item)}
                btnClass={BtnClasses.DEFAULT}
              />
            )}
          </div>
        ))}
      </div>
      {isOpen && modalData && <LoanModal isOpen={isOpen} data={modalData} />}
    </>
  );
};
