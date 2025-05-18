import { NextResponse } from "next/server";
import { env } from "../_environment/environment";

export async function POST(request: Request) {
  const bodyReq = await request.json();

  const { searchParams } = new URL(request.url);
  const contaNum = searchParams.get("contaDestino");

  const resConta = await fetch(
    `${env.localApi}/contas?numeroConta=${contaNum}`
  );
  const contas = await resConta.json();
  const conta = contas[0];

  const body = {
    id: conta["depositos"].length + 1,
    ...bodyReq,
    contaOrigem: null, // significa que o deposito foi feito pelo dono da conta
  };

  const req = await fetch(`${env.localApi}/contas/${conta.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      depositos: [...conta["depositos"], body],
      saldo: conta.saldo + bodyReq.valor,
    }),
  });

  return new Response(JSON.stringify(req));
}
