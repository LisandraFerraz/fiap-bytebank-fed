import { ITed } from "../../../utils/interfaces/transaction";
import { env } from "../_environment/environment";
import { getFetch } from "../lib/functions/fetch";
import { IConta } from "../../../utils/interfaces/conta";
import { hasEmptyValues } from "../lib/functions/has-empty-prop";
import { NextApiRequest, NextApiResponse } from "next";

export default async function sendMoneyHandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({
      errorMsg: `Método não permitido!`,
    });
  }

  try {
    const body: ITed = req.body;
    const { usuarioCpf } = req.query;

    if (usuarioCpf && !hasEmptyValues(body)) {
      // Resgata a conta destino
      const resD = await getFetch<IConta[]>(
        `${env.localApi}/contas?usuarioCpf=${body.cpfDestinatario}`
      );
      const contaDestino = resD[0];

      // Resgata a conta origem
      const resO = await getFetch<IConta[]>(
        `${env.localApi}/contas?usuarioCpf=${usuarioCpf}`
      );
      const contaOrigem = resO[0];

      // Depositando em uma conta destino e adicionando depósito no histórico
      await fetch(
        // let novoDeposito =
        `${env.localApi}/contas/${contaDestino.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            depositos: [...(contaDestino["depositos"] || []), body],
            saldo: contaDestino.saldo + body.valor,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //  Deduzindo o valor do deposito na conta origem e adicionando transferência no histórico
      await fetch(
        // let novaTransacao =
        `${env.localApi}/contas/${contaOrigem.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            transferencias: [...(contaOrigem["transferencias"] || []), body],
            saldo: contaOrigem.saldo - body.valor,
          }),
        }
      );

      // Adicionar na resposta de sucesso
      // const data = {
      //   deposito: await novoDeposito.json(),
      //   transacao: await novaTransacao.json(),
      // };

      return res.status(200).json({
        successMsg: "Transferência realizada com sucesso!",
      });
    } else {
      return res.status(405).json({
        successMsg:
          "É necessário que os campos obrigatórios sejam preenchidos!",
      });
    }
  } catch (error) {}
}
