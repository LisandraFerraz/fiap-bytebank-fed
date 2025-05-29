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
  if (req.method === "POST") {
    try {
      const body: ITed = req.body;
      const { usuarioCpf } = req.query;

      if (usuarioCpf && !hasEmptyValues(body)) {
        // Resgata a conta origem
        const contas = await getFetch<IConta[]>(
          `${env.localApi}/contas?usuarioCpf=${usuarioCpf}`
        );
        const conta = contas[0];

        if (!conta) {
          return res.status(404).json({
            successMsg: "Não foi possível resgatar os dados da sua conta.",
          });
        }

        await fetch(`${env.localApi}/contas/${conta.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            transferencias: [...(conta["transferencias"] || []), body],
            saldo: conta.saldo - body.valor,
          }),
        });

        return res.status(200).json({
          successMsg: "Transferência TED registrada com sucesso.",
        });
      } else {
        return res.status(405).json({
          successMsg:
            "É necessário que os campos obrigatórios sejam preenchidos!",
        });
      }
    } catch (error) {}
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    const { usuarioCpf } = req.query;

    if (!usuarioCpf || !id) {
      return res.status(405).json({
        errorMsg: `Dados para identificação não informados.`,
      });
    }

    const contas = await getFetch<IConta[]>(
      `${env.localApi}/contas?usuarioCpf=${usuarioCpf}`
    );
    const conta = contas[0];

    if (!conta) {
      return res.status(404).json({
        errorMsg: `Não foi possível recuperar os dados da sua conta.`,
      });
    }

    const newTransactions = conta.transferencias.filter(
      (cf) => String(cf.id) !== String(id)
    );

    if (!newTransactions) {
      return res.status(404).json({
        errorMsg: `Não foi possível recuperar as transferências originais.`,
      });
    }

    const aimedTed = conta.transferencias.find(
      (cf) => String(cf.id) === String(id)
    );

    if (!aimedTed) {
      return res.status(404).json({
        errorMsg: `Não foi possível recuperar a transferência original.`,
      });
    }

    const newSaldo = conta.saldo + aimedTed.valor;
    await fetch(`${env.localApi}/contas/${conta.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...conta,
        saldo: newSaldo,
        transferencias: newTransactions,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else if (req.method === "PATCH") {
    const { usuarioCpf } = req.query;
    const reqBody = req.body;

    if (!usuarioCpf || hasEmptyValues(reqBody)) {
      return res.status(405).json({
        errorMsg: `Dados para identificação não informados.`,
      });
    }

    const contas = await getFetch<IConta[]>(
      `${env.localApi}/contas?usuarioCpf=${usuarioCpf}`
    );
    const conta = contas[0];

    if (!conta) {
      return res.status(404).json({
        errorMsg: `Não foi possível recuperar os dados da sua conta.`,
      });
    }

    const newTransactions = conta.transferencias.filter(
      (cf) => String(cf.id) !== String(reqBody.id)
    );

    if (!newTransactions) {
      return res.status(404).json({
        errorMsg: `Não foi possível recuperar as transferências originais.`,
      });
    }

    const aimedTed = conta.transferencias.find(
      (cf) => String(cf.id) === String(reqBody.id)
    );

    if (!aimedTed) {
      return res.status(404).json({
        errorMsg: `Não foi possível recuperar a transferência original.`,
      });
    }

    const newSaldo = conta.saldo + aimedTed.valor;
    await fetch(`${env.localApi}/contas/${conta.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...conta,
        saldo: newSaldo - reqBody.valor,
        transferencias: [...newTransactions, reqBody],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return res.status(405).json({
      errorMsg: `Método não permitido!`,
    });
  }
}
