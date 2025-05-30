import { NextResponse } from "next/server";
import { IConta } from "../../../utils/interfaces/conta";
import { IPix } from "../../../utils/interfaces/transaction";
import { IUsuario } from "../../../utils/interfaces/user";
import { env } from "../_environment/environment";
import { getFetch } from "../lib/functions/fetch";
import { hasEmptyValues } from "../lib/functions/has-empty-prop";
import { NextApiRequest, NextApiResponse } from "next";

export default async function sendPixHandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body: IPix = req.body;
    const { usuarioCpf } = req.query;

    if (usuarioCpf && !hasEmptyValues(body)) {
      // Recupera dados do usuário logado e verifica se o PIX é o mesmo do destino.
      const users = await getFetch<IUsuario[]>(
        `${env.localApi}/usuarios?cpf=${usuarioCpf}`
      );
      const user = users[0];

      if (user?.dadosBancarios.chavePix === String(body.chavePix)) {
        return res.status(405).json({
          errorMsg: `Você não pode registrar um PIX para a própria conta.`,
        });
      }

      const contas = await getFetch<IConta[]>(
        `${env.localApi}/contas?usuarioCpf=${usuarioCpf}`
      );
      const conta = contas[0];

      if (!conta) {
        return res.status(405).json({
          errorMsg: `Não foi possível recuperar os dados da sua conta.`,
        });
      }

      // Verifica se o saldo é suficiente para enviar o PIX
      if (conta.saldo >= body.valor) {
        try {
          await fetch(`${env.localApi}/contas/${String(conta.id)}`, {
            method: "PATCH",
            body: JSON.stringify({
              ...conta,
              saldo: conta.saldo - body.valor,
              transferencias: [...(conta["transferencias"] || []), body],
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          return res.status(200).json({
            successMessage: `PIX registrado com sucesso no valor de R$ ${body.valor} para ${body?.destinatario}`,
          });
        } catch (error) {
          return res.status(500).json({
            errorMessage: "Não foi possível registrar o PIX.",
          });
        }
      } else {
        return res.status(405).json({
          errorMessage:
            "Seu saldo não é suficiente para registrar o valor indicado no PIX.",
        });
      }
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    const { usuarioCpf } = req.query;

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
      (ct) => String(ct.id) !== String(id)
    );

    if (!newTransactions) {
      return res.status(404).json({
        errorMsg: `Não foi possível recuperar as transferências originais.`,
      });
    }

    const aimedPix = conta.transferencias.find(
      (ct) => String(ct.id) === String(id)
    );

    if (!aimedPix) {
      return res.status(404).json({
        errorMsg: `Não foi possível recuperar a transferência original.`,
      });
    }

    const newSaldo = conta.saldo + aimedPix?.valor;

    await fetch(`${env.localApi}/contas/${conta.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...conta,
        transferencias: newTransactions,
        saldo: newSaldo,
      }),
    });
  } else if (req.method === "PATCH") {
    const { usuarioCpf } = req.query;
    const reqBody: IPix = req.body;

    if (!usuarioCpf && hasEmptyValues(reqBody)) {
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
      (ct) => String(ct.id) !== String(reqBody.id)
    );

    if (!newTransactions) {
      return res.status(404).json({
        errorMsg: `Não foi possível recuperar as transferências originais.`,
      });
    }

    const aimedPix = conta.transferencias.find(
      (ct) => String(ct.id) === String(reqBody.id)
    );

    if (!aimedPix) {
      return res.status(404).json({
        errorMsg: `Não foi possível recuperar as transferências originais.`,
      });
    }

    const newSaldo = conta.saldo - aimedPix.valor;

    if (newSaldo < reqBody.valor) {
      return res.status(405).json({
        errorMsg: `O valor informado é menor do que você tem disponível na conta.`,
      });
    }

    await fetch(`${env.localApi}/contas/${conta.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...conta,
        saldo: newSaldo + reqBody.valor,
        transferencias: [...newTransactions, reqBody],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.status(200).json({
      errorMsg: `Atualização do PIX registrada com sucesso!`,
    });
  } else {
    return res.status(405).json({
      errorMsg: `Método não permitido!`,
    });
  }
}
