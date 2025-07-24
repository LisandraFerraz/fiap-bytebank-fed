import { IConta } from "./../../../utils/interfaces/conta";
import { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../../core/environment/api-urls";
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
    const { usuarioCpf } = req.query;
    const { transType } = req.query;
    const { transPeriod } = req.query;
    const access_token = req.headers.authorization;

    if (access_token && usuarioCpf) {
      const conta = await apiFetch<IConta>({
        url: `${env.NEST_API}/account?usuarioCpf=${usuarioCpf}`,
        method: "GET",
        access_token: `${access_token.replace("Bearer ", "")}`,
      });

      let transactions: any[] = [];
      let transacoes = transactions.concat(
        conta.depositos || [],
        conta.transferencias || [],
        conta.historicoEmprestimos || []
      );

      const {
        depositos,
        transferencias,
        historicoEmprestimos,
        ...parsedConta
      } = conta;

      const accountDetails = {
        ...parsedConta,
      };

      // filtra pelo tipo de transacao
      if (transType) {
        switch (transType) {
          case TransacationTypes.DEPOSITO:
            transacoes = depositos || [];
            break;

          case TransacationTypes.EMPRESTIMO:
            transacoes = historicoEmprestimos || [];
            break;

          case TransacationTypes.PIX:
            transacoes = transferencias.filter(
              (tf: any) => tf.tipo === TransacationTypes.PIX
            );
            break;

          case TransacationTypes.TED:
            transacoes = transferencias.filter(
              (tf: any) => tf.tipo === TransacationTypes.TED
            );
            break;
        }
      }

      if (transPeriod !== null) {
        switch (transPeriod) {
          case TransPeriod.RECENT:
            transacoes = OrderByDate(transacoes);
            break;

          case TransPeriod.OLD:
            transacoes = OrderByDate(transacoes);
            transacoes.reverse();
            break;
        }
      }

      return res.status(200).json({
        accountDetails,
        transacoes,
        successMsg: "Transferências da conta recuperadas com sucesso.",
      });
    }
  } else {
    return res
      .status(500)
      .json({ errorMessage: "Não foi possível litar as transaferências." });
  }
}
