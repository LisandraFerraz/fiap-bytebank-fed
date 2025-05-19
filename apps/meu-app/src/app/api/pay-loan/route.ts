import { NextRequest } from "next/server";
import { IPayLoan } from "../../../utils/interfaces/transaction";
import { env } from "../_environment/environment";

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const loanId = searchParams.get("loanId");
  const cpf = searchParams.get("cpf");
  const body: IPayLoan = await request.json();

  const reqConta = await fetch(`${env.localApi}/contas?usuarioCpf=${cpf}`);
  const contas = await reqConta.json();
  const conta = contas[0];

  const loanIndex = conta.historicoEmprestimos.findIndex(
    (e: any) => e.id === loanId
  );

  const valorEmprestimo = conta.historicoEmprestimos[loanIndex].valor;

  if (body.valorPago > 0 && body.valorPago <= valorEmprestimo) {
    if (loanIndex !== undefined && loanIndex !== -1) {
      const updateReq = await fetch(`${env.localApi}/contas/${conta.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          linhaCredito: conta.linhaCredito + body.valorPago,
          saldo: conta.saldo - body.valorPago,
          historicoEmprestimos: [
            {
              ...conta.historicoEmprestimos[loanIndex],
              valor: valorEmprestimo - body.valorPago,
              aberto: body.valorPago === valorEmprestimo ? false : true,
            },
          ],
        }),
      });
      return new Response(
        JSON.stringify({
          updateReq,
          successMsg: `Pagamento no valor R$ ${body.data} feito com sucesso.`,
        })
      );
    } // fim if index
    else if (body.valorPago <= 0) {
      return new Response(
        JSON.stringify({
          errorMsg: "O valor do pagamento não pode ser menor ou igual a 0.",
        }),
        { status: 400 }
      );
    } else if (body.valorPago > valorEmprestimo) {
      return new Response(
        JSON.stringify({
          errorMsg: `O valor R$ ${body.valorPago} é maior que o débito aberto de R$ ${valorEmprestimo}`,
        }),
        { status: 400 }
      );
    }
  }
}
