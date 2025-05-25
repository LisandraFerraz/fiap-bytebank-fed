import { NextResponse } from "next/server";
import { env } from "../_environment/environment";
import { getFetch } from "../lib/functions/fetch";
import { IDeposito } from "../../../utils/interfaces/transaction";
import { IConta } from "../../../utils/interfaces/conta";
import { hasEmptyValues } from "../lib/functions/has-empty-prop";

export async function POST(request: Request) {
  const bodyReq: IDeposito = await request.json();

  const { searchParams } = new URL(request.url);
  const cpf = searchParams.get("usuarioCpf");

  if (cpf && !hasEmptyValues(bodyReq)) {
    const resConta = await getFetch<IConta[]>(
      `${env.localApi}/contas?usuarioCpf=${cpf}`
    );
    const conta = resConta[0];

    const req = await fetch(`${env.localApi}/contas/${conta.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        depositos: [...conta["depositos"], bodyReq],
        saldo: conta.saldo + bodyReq.valor,
      }),
    });

    return NextResponse.json({
      successMsg: `Depósito no valor de R$ ${bodyReq.valor} realizado com sucesso!`,
      status: 200,
      data: req,
    });
  } else {
    return NextResponse.json({
      successMsg: `É necessário que os campos obrigatórios sejam preenchidos!`,
      status: 400,
    });
  }
}
