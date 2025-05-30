import { NextApiRequest, NextApiResponse } from "next";
import { getFetch } from "../lib/functions/fetch";
import { env } from "../_environment/environment";
import { IConta } from "../../../utils/interfaces/conta";
import { IEmprestimo } from "../../../utils/interfaces/transaction";

export default async function listLoansHandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cpf } = req.query;
  const { id } = req.query; // Para atualizacoes

  if (req.method === "GET") {
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
      const paidLoan = data.filter((loan: any) => loan.aberto === false);
      return res.status(200).json({
        paidLoan,
        successMsg: "Histórico de empréstimos resgatado com sucesso.",
      });
    }
  } else if (req.method === "DELETE") {
    const contas = await getFetch<IConta[]>(
      `${env.localApi}/contas?usuarioCpf=${cpf}`
    );
    const conta = contas[0];

    if (!conta) {
      return res.status(404).json({
        errorMessage: "Conta não encontrada.",
      });
    }

    const aimedLoan = conta.historicoEmprestimos.find(
      (contDep) => String(contDep.id) === String(id)
    );

    if (!aimedLoan) {
      return res.status(404).json({
        errorMessage: "Empréstimo não encontrado.",
      });
    }

    const parsedLoans = conta.historicoEmprestimos.filter(
      (contDep) => String(contDep.id) !== String(id)
    );

    await fetch(`${env.localApi}/contas/${conta.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...conta,
        saldo: conta.saldo - aimedLoan.valorDevido,
        historicoEmprestimos: parsedLoans,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else if (req.method === "PATCH") {
    const contas: IConta[] = await getFetch(
      `${env.localApi}/contas?usuarioCpf=${cpf}`
    );
    const conta = contas[0];

    const updateBody: IEmprestimo = req.body;

    const originalLoan = conta.historicoEmprestimos.find(
      (c) => c.id === updateBody.id
    );

    if (!originalLoan) {
      return res.status(404).json({
        successMsg:
          "Não foi possível recuperar os dados do empréstimo original.",
      });
    }

    const aimedLoan = conta.historicoEmprestimos.find(
      (c) => String(c.id) === String(updateBody.id)
    );

    const parsedLoans = conta.historicoEmprestimos.map((c) =>
      String(c.id) === String(aimedLoan?.id) ? { ...c, ...updateBody } : c
    );

    const novoSaldo = conta.saldo - originalLoan?.valorDevido;

    if (conta.linhaCredito < updateBody.valor) {
      return res.status(405).json({
        errorMsg: `O valor informado é maior do que você tem disponível na linha de crédito.`,
      });
    }

    await fetch(`${env.localApi}/contas/${conta.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...conta,
        saldo: novoSaldo + updateBody.valorDevido, // novo saldo
        historicoEmprestimos: parsedLoans,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.status(200).json({
      successMsg: "Empréstimo atualizado com sucesso.",
    });
  } else {
    return res.status(405).json({
      errorMsg: `Método não permitido!`,
    });
  }
}
