"use client";
import styles from "./styles.module.scss";
import { StatementLayout } from "@components/statement-layout/layout";
import { TransactionList } from "@components/transactions-list/transaction-list";
import { IUsuarioConta } from "../../utils/interfaces/user";
import { GetStaticProps } from "next";
import { endpoints } from "../../environment/endpoints";
import { useEffect } from "react";
import { env } from "../api/_environment/environment";

interface HomeProps {
  data: IUsuarioConta;
}

export default function Home(data: HomeProps) {
  const dateNow = new Date();

  useEffect(() => {
    console.log("DATA: ", data);
  }, []);

  return (
    <div className={styles.content}>
      <StatementLayout />
      <TransactionList />
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const response = await fetch(
      `${env.bffUrl}${endpoints.listaUser}?cpf=${"12345678901"}`
    );
    const udata = await response.json();
    const data = udata.data;

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: {},
      },
    };
  }
};
