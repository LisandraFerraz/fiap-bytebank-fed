import { IConta, ITransacoes } from "./../../../utils/interfaces/conta";
import { NextApiRequest, NextApiResponse } from "next";
import { apiFetch } from "../../../core/core-api";
import {
  TransacationTypes,
  TransPeriod,
} from "../../../utils/interfaces/transaction";
import { OrderByDate } from "./utils/order-by-data";

export default async function handleListTrans(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { transType, transPeriod, usuarioCpf } = req.query;
    const { itemsPage, currentPage } = req.query;

    const access_token = req.headers.authorization;

    if (access_token && usuarioCpf) {
      const conta = await apiFetch<IConta>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/account?usuarioCpf=${usuarioCpf}`,
        method: "GET",
        access_token: `${access_token.replace("Bearer ", "")}`,
      });

      let transactions: any[] = [];

      const { transacoesList, ...parsedConta } = conta;

      const { transacoes } = transacoesList;
      transactions = transacoes;

      const accountDetails = {
        ...parsedConta,
      };

      // filtra pelo tipo de transacao
      if (transType) {
        switch (transType) {
          case TransacationTypes.DEPOSITO:
            transactions =
              transacoesList.transacoes.filter(
                (tf) => tf.tipo === `${TransacationTypes.DEPOSITO}`
              ) || [];
            break;

          case TransacationTypes.EMPRESTIMO:
            transactions =
              transacoesList.transacoes.filter(
                (tf) => tf.tipo === `${TransacationTypes.EMPRESTIMO}`
              ) || [];
            break;

          case TransacationTypes.PIX:
            transactions =
              transacoesList.transacoes.filter(
                (tf) => tf.tipo === `${TransacationTypes.PIX}`
              ) || [];
            break;

          case TransacationTypes.TED:
            transactions =
              transacoesList.transacoes.filter(
                (tf) => tf.tipo === `${TransacationTypes.TED}`
              ) || [];
            break;
        }
      }

      if (transPeriod !== null) {
        switch (transPeriod) {
          case TransPeriod.RECENT:
            transactions = OrderByDate(transactions);
            break;

          case TransPeriod.OLD:
            transactions = OrderByDate(transactions);
            transactions.reverse();
            break;
        }
      }

      // Paginacao
      const totalItems = transactions.length;
      const items = Number(itemsPage) || Number(totalItems);
      const page = Number(currentPage) || 1;

      const inicio = items * (page - 1);
      const fim = inicio + items;

      transactions = transactions.slice(inicio, fim);

      const paginacao = {
        totalItems: totalItems,
        itemsPage: items,
        currentPage: page,
      };

      return res.status(200).json({
        accountDetails,
        transacoes: { transactions, paginacao },
        successMsg: "Transferências da conta recuperadas com sucesso.",
      });
    }
  } else {
    return res
      .status(500)
      .json({ errorMessage: "Não foi possível listar as transferências." });
  }
}
