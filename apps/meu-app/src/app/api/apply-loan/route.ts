import { NextRequest } from "next/server";
import { env } from "../_environment/environment";
import { v4 as generateUUID } from "uuid";

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cpf = searchParams.get("cpf");
  const loan = Number(searchParams.get("loan"));

  const contasReq = await fetch(`${env.localApi}/contas?usuarioCpf=${cpf}`);
  const contas = await contasReq.json();
  const conta = contas[0];

  // Verifica se o limite de empréstimo é suficiente
  // Adiciona o empréstimo no histórico
  if (conta.linhaCredito > loan) {
    const updateReq = await fetch(`${env.localApi}/contas/${conta.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        linhaCredito: conta.linhaCredito - loan,
        saldo: conta.saldo + loan,
        historicoEmprestimos: [
          {
            ...(conta.historicoEmprestimos || []),
            id: generateUUID(),
            data: new Date(),
            valor: loan,
            aberto: true,
          },
        ],
      }),
    });

    return new Response(
      JSON.stringify({
        updateReq,
        successMsg: "Empréstimo feito com sucesso.",
      })
    );
  } else {
    return new Response(
      JSON.stringify({
        errorMsg:
          "O valor solicitado é maior do que sua linha de crédito disponível. Por favor, solicite um valor dentro do limite.",
      })
    );
  }
}
