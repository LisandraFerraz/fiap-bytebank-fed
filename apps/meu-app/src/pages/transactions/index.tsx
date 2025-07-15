"use client";
import styles from "./styles.module.scss";
import { StatementLayout } from "@components/statement-layout/layout";
import { TransactionList } from "@components/transactions-list/transaction-list";
import { Shortcuts } from "@components/shortcuts/shortcuts";
import { GetStaticProps } from "next";
import { endpoints } from "../../environment/endpoints";
import { env } from "../api/_environment/environment";

interface IHomeProps {
  data: any;
}

export default function TransactionsLayout({ data }: IHomeProps) {
  return (
    <div className={styles.content}>
      <StatementLayout data={data?.accDetails} />
      <Shortcuts />
      <TransactionList data={data?.transactions} />
    </div>
  );
}

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
  try {
    const response = await fetch(
      `${env.bffUrl}${endpoints.listaAccount}?cpf=${"12345678901"}`,
      { method: "GET" }
    );
    const data = await response.json();

    return {
      props: {
        data: data?.data ?? null,
      },
      revalidate: 5,
    };
  } catch (error) {
    return {
      props: {
        data: {},
      },
    };
  }
};
