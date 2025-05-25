import { NextResponse } from "next/server";
import { coreApi } from "../core/core-api";
import { IConta } from "../../../utils/interfaces/conta";
import { IAgencia } from "../../../utils/interfaces/agencia";
import { IUsuarioConta } from "../../../utils/interfaces/user";
import { NextApiRequest, NextApiResponse } from "next";

/*
 * Retorna um json com os dados do usuário
 * e sua conta bancária (incluindo as transações)
 * conforme o search param "cpf"
 */
export default async function getUserHandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cpf = req.query;

  const { userRes, contasRes } = {
    userRes: await coreApi({
      url: `usuarios?cpf=${cpf}`,
      method: "GET",
    }),
    contasRes: await coreApi({
      url: "contas",
      method: "GET",
    }),
  };

  const { userData, contasData } = {
    userData: await userRes.json(),
    contasData: await contasRes.json(),
  };

  const contaB = contasData.find(
    (conta: IConta) => conta.usuarioCpf === String(cpf)
  );

  let data: IUsuarioConta;

  if (contaB) {
    data = {
      usuario: userData,
      contaBancaria: contaB,
    };
    return res
      .status(500)
      .json({ data: data, successMessage: "Dados listados com sucesso" });
  }
  return res
    .status(500)
    .json({ errorMessage: "Não foi possível listar os dados do usuário." });
}
