import { NextApiRequest, NextApiResponse } from "next";
import { getFetch } from "../lib/functions/fetch";
import { env } from "../_environment/environment";
import { IConta } from "../../../utils/interfaces/conta";

export default async function listLoansHandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      errorMsg: `Método não permitido!`,
    });
  }

  const { cpf } = req.query;
  const { aberto } = req.query;

  const response: IConta[] = await getFetch(
    `${env.localApi}/contas?usuarioCpf=${cpf}`
  );

  const data = response[0].historicoEmprestimos;

  if (aberto) {
    const pendingLoan = data.filter((loan: any) => loan.aberto === true);
    return res.status(200).json({
      pendingLoan,
      successMsg: "Lista de empréstimos abertos resgatada com sucesso.",
    });
  } else {
    return res.status(200).json({
      data,
      successMsg: "Histórico de empréstimos resgatado com sucesso.",
    });
  }
}
