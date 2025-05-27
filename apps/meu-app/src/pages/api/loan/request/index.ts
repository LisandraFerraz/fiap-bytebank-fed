import { env } from "../../_environment/environment";
import { v4 as generateUUID } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";
import { IEmprestimo } from "../../../../utils/interfaces/transaction";

export default async function requestLoanHandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({
      successMsg: `Método não permitido!`,
    });
  }

  const { cpf } = req.query;
  const loanBody: IEmprestimo = req.body;

  const contasReq = await fetch(`${env.localApi}/contas?usuarioCpf=${cpf}`);
  const contas = await contasReq.json();
  const conta = contas[0];

  console.log("loanBody: ", loanBody);
  console.log("cpf: ", cpf);
  console.log("conta: ", conta);

  // Verifica se o limite de empréstimo é suficiente
  // Adiciona o empréstimo no histórico
  if (conta.linhaCredito > loanBody.valor) {
    await fetch(`${env.localApi}/contas/${conta.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        linhaCredito: conta.linhaCredito - loanBody.valor,
        saldo: conta.saldo + loanBody.valor,
        historicoEmprestimos: [
          ...(conta.historicoEmprestimos || []),
          {
            ...loanBody,
            aberto: true,
            valorDevido: loanBody.valor,
          },
        ],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.status(200).json({
      successMsg: "Empréstimo feito com sucesso.",
    });
  } else {
    return res.status(405).json({
      errorMsg:
        "O valor solicitado é maior do que sua linha de crédito disponível. Por favor, solicite um valor dentro do limite.",
    });
  }
}
