import { NextRequest } from "next/server";
import { IPayLoan } from "../../../utils/interfaces/transaction";
import { env } from "../_environment/environment";

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const body: IPayLoan = await request.json();

  const loanId = searchParams.get("loanId");
  const cpf = searchParams.get("cpf");

  const reqConta = await fetch(`${env.localApi}/contas?usuarioCpf=${cpf}`);
  const contas = await reqConta.json();
  const conta = contas[0];

  console.log("conta ", conta.historicoEmprestimos);

  const loanIndex = conta.historicoEmprestimos.findIndex(
    (e: any) => e.id === loanId
  );

  console.log("loan valor : ", conta.historicoEmprestimos[loanIndex].valor);
  if (
    body.valorPago > 0 &&
    body.valorPago <= conta.historicoEmprestimos[loanIndex].valor
  ) {
    if (loanIndex !== undefined && loanIndex !== -1) {
      const updateReq = await fetch(`${env.localApi}/contas/${conta.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          linhaCredito: conta.linhaCredito + body.valorPago,
          saldo: conta.saldo - body.valorPago,
          historicoEmprestimos: [
            {
              ...conta.historicoEmprestimos[loanIndex],
              valor:
                conta.historicoEmprestimos[loanIndex].valor - body.valorPago,
              aberto:
                body.valorPago === conta.historicoEmprestimos[loanIndex].valor
                  ? false
                  : true,
            },
          ],
        }),
      });
    } // fim if index
  }
}
