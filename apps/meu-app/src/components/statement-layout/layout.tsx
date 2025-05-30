"use client";
import { Balance } from "@components/balance/balance";
import styles from "./statement.module.scss";
import { IConta } from "../../utils/interfaces/conta";
import { CustomLink } from "@components/custom-link/custom-link";
import { Icon } from "@components/icon/icon";

interface IStatement {
  data: IConta;
}

export const StatementLayout = ({ data }: IStatement) => {
  return (
    <div className={styles.statLayout}>
      <Balance amount={data.saldo} />
      <div className={styles.actions}>
        <span className={styles.btn_transaction}>
          <CustomLink className={styles.link} href="/add-money">
            <Icon iconKey="addMoney" />
            <span>Adicionar dinheiro</span>
          </CustomLink>
        </span>
        <span className={styles.btn_transaction}>
          <CustomLink className={styles.link} href="/new-transaction">
            <Icon iconKey="transaction" />
            <span>Registrar Transação</span>
          </CustomLink>
        </span>
      </div>
    </div>
  );
};
