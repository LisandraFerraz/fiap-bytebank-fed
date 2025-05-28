"use client";
import styles from "./styles.module.scss";
import { StatementLayout } from "@components/statement-layout/layout";
import { TransactionList } from "@components/transactions-list/transaction-list";
import { Shortcuts } from "@components/shortcuts/shortcuts";
import { IConta } from "../../utils/interfaces/conta";
import { GetStaticProps } from "next";
import { endpoints } from "../../environment/endpoints";
import { env } from "../api/_environment/environment";
import { useEffect } from "react";
import { parseCookies } from "nookies";

interface IHomeProps {
  data: any;
}

export default function Home({ data }: IHomeProps) {
  useEffect(() => {
    const cookies = parseCookies();
    const userCpf = cookies["@userCpf"];
    console.log("userCpf | ", userCpf);
  }, []);

  return (
    <div className={styles.content}>
      <StatementLayout data={data.accDetails} />
      <Shortcuts />
      <TransactionList data={data.transactions} />
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
        data: data.data,
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
