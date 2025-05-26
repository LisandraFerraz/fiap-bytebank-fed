import { IEmprestimo } from "../../../../utils/interfaces/transaction";
import { env } from "../../_environment/environment";
import { NextApiRequest, NextApiResponse } from "next";

export default async function payLoanHandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cpf } = req.query;
  const body: IEmprestimo = req.body;

  const reqConta = await fetch(`${env.localApi}/contas?usuarioCpf=${cpf}`);
  const contas = await reqConta.json();
  const conta = contas[0];

  const loanIndex = conta.historicoEmprestimos.findIndex(
    (e: any) => e.id === body.id
  );

  const valorEmprestimo = conta.historicoEmprestimos[loanIndex].valor;

  const oldHistory = conta.historicoEmprestimos.filter(
    (ch: IEmprestimo) => ch.id !== body.id
  );

  if (body.valor > 0 && body.valor <= valorEmprestimo) {
    if (loanIndex !== undefined && loanIndex !== -1) {
      const updateReq = await fetch(`${env.localApi}/contas/${conta.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...conta,
          linhaCredito: conta.linhaCredito + body.valorPago,
          saldo: conta.saldo - body.valorPago,
          historicoEmprestimos: [
            ...oldHistory,
            {
              ...conta.historicoEmprestimos[loanIndex],
              aberto: body.valor === valorEmprestimo ? false : true,
              valorPago: body.valorPago,
            },
          ],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.status(200).json({
        data: updateReq,
        successMsg: `Pagamento no valor R$ ${body.data} feito com sucesso.`,
      });
    } // fim if index
    else if (body.valor <= 0) {
      return res.status(403).json({
        errorMsg: "O valor do pagamento não pode ser menor ou igual a 0.",
      });
    } else if (body.valor > valorEmprestimo) {
      return res.status(403).json({
        errorMsg: `O valor R$ ${body.valor} é maior que o débito aberto de R$ ${valorEmprestimo}`,
      });
    }
  }
}
