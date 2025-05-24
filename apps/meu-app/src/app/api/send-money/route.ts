import { ITed } from "../../../utils/interfaces/transaction";
import { env } from "../_environment/environment";
import { getFetch } from "../lib/functions/fetch";
import { IConta } from "../../../utils/interfaces/conta";
import { NextResponse } from "next/server";
import { hasEmptyValues } from "../lib/functions/has-empty-prop";

export async function POST(request: Request) {
  const body: ITed = await request.json();

  console.log(hasEmptyValues(body));

  const { searchParams } = new URL(request.url);
  const cpf = searchParams.get("cpf");

  if (cpf && !hasEmptyValues(body)) {
    // Resgata a conta destino
    const resD = await getFetch<IConta[]>(
      `${env.localApi}/contas?usuarioCpf=${body.cpfDestinatario}`
    );
    const contaDestino = resD[0];

    // Resgata a conta origem
    const resO = await getFetch<IConta[]>(
      `${env.localApi}/contas?usuarioCpf=${cpf}`
    );
    const contaOrigem = resO[0];

    // Depositando em uma conta destino e adicionando depósito no histórico
    let novoDeposito = await fetch(
      `${env.localApi}/contas/${contaDestino.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          depositos: [...(contaDestino["depositos"] || []), body],
          saldo: contaDestino.saldo + body.valor,
        }),
      }
    );

    // Deduzindo o valor do deposito na conta origem e adicionando transferência no histórico
    let novaTransacao = await fetch(
      `${env.localApi}/contas/${contaOrigem.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          transferencias: [...(contaOrigem["transferencias"] || []), body],
          saldo: contaOrigem.saldo - body.valor,
        }),
      }
    );

    const data = {
      deposito: await novoDeposito.json(),
      transacao: await novaTransacao.json(),
    };

    return new Response(
      JSON.stringify({
        data,
        successMsg: "Transferência realizada com sucesso!",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } else {
    return NextResponse.json(
      {
        errorMsg: "Existem campos inválidos.",
      },
      {
        status: 400,
      }
    );
  }
}
