import { env } from "../_environment/environment";
import { getFetch } from "../lib/functions/fetch";
import { IDeposito } from "../../../utils/interfaces/transaction";
import { IConta } from "../../../utils/interfaces/conta";
import { hasEmptyValues } from "../lib/functions/has-empty-prop";
import { NextApiRequest, NextApiResponse } from "next";

export default async function depositHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const bodyReq: IDeposito = req.body;
      const { usuarioCpf } = req.query;

      if (usuarioCpf && !hasEmptyValues(bodyReq)) {
        const resConta = await getFetch<IConta[]>(
          `${env.localApi}/contas?usuarioCpf=${usuarioCpf}`
        );
        const conta = resConta[0];

        await fetch(`${env.localApi}/contas/${conta.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            depositos: [...conta["depositos"], bodyReq],
            saldo: conta.saldo + Number(bodyReq.valor),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        return res.status(200).json({
          successMsg: `Depósito no valor de R$ ${bodyReq.valor} realizado com sucesso!`,
          status: 200,
        });
      } else {
        return res.status(405).json({
          successMsg: `É necessário que os campos obrigatórios sejam preenchidos!`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        successMsg:
          "Um erro inesperado aconteceu e não foi possível concluir o depósito",
        error: error,
      });
    }
  } else if (req.method === "DELETE") {
    const { usuarioCpf } = req.query;
    const { id } = req.query;

    if (usuarioCpf && id) {
      const resConta = await getFetch<IConta[]>(
        `${env.localApi}/contas?usuarioCpf=${usuarioCpf}`
      );
      const conta = resConta[0];

      const updateDeposit = conta.depositos.filter(
        (dp) => String(dp.id) !== id
      );

      await fetch(`${env.localApi}/contas/${conta.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...conta,
          depositos: updateDeposit,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.status(200).json({
        successMsg: `Depósito foi atualizado com sucesso!`,
      });
    } else {
      return res.status(405).json({
        successMsg: `É necessário que o valor a ser editado esteja preenchido!`,
      });
    }
  } else if (req.method === "PATCH") {
    const bodyReq: IDeposito = req.body;
    const { usuarioCpf } = req.query;

    if (usuarioCpf && !hasEmptyValues(bodyReq)) {
      const resConta = await getFetch<IConta[]>(
        `${env.localApi}/contas?usuarioCpf=${usuarioCpf}`
      );
      const conta = resConta[0];

      const originalDeposit = conta.depositos.find(
        (dp) => String(dp.id) === String(bodyReq.id)
      );

      if (!originalDeposit) {
        return res.status(404).json({
          errorMsg:
            "Não foi possível encontrar o depósito original na base de dados.",
        });
      }

      const newDeposits = conta.depositos.filter(
        (dp) => String(dp.id) !== String(bodyReq.id)
      );

      const newSaldo = conta.saldo - originalDeposit.valor;

      await fetch(`${env.localApi}/contas/${conta.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...conta,
          saldo: newSaldo + Number(bodyReq.valor),
          depositos: [...newDeposits, bodyReq],
        }),
      });
    } else {
      return res.status(405).json({
        successMsg: `Campos obrigatórios não informados.`,
      });
    }
  } else {
    return res.status(405).json({
      successMsg: `Método não permitido!`,
    });
  }
}
