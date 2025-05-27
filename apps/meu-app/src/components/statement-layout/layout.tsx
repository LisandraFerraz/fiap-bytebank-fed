"use client";
import { Balance } from "@components/balance/balance";
import styles from "./statement.module.scss";
import { BtnClasses, Button } from "@components/button/button";
import { useRouter } from "next/navigation";
import { IConta } from "../../utils/interfaces/conta";

interface IStatement {
  data: IConta;
}

export const StatementLayout = ({ data }: IStatement) => {
  const router = useRouter();

  return (
    <div className={styles.statLayout}>
      <Balance amount={data.saldo} />
      <div className={styles.actions}>
        <Button
          btnClass={BtnClasses.CONFIRM}
          iconKey="addMoney"
          text="Adicionar dinheiro"
          click={() => router.push("/add-money")}
        />
        <Button
          btnClass={BtnClasses.CONFIRM}
          iconKey="transaction"
          text="Nova transação"
          click={() => router.push("/new-transaction")}
        />
      </div>
      {/* {showModal && (
        <TransactionModal transactionType={TransacationTypes.DEPOSITO} />
      )} */}
    </div>
  );
};
