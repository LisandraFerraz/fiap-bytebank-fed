import { env } from "../_environment/environment";
import { v4 as generateUUID } from "uuid";

export async function POST(request: Request) {
  const body = await request.json();

  const { searchParams } = new URL(request.url);
  const cpf = searchParams.get("cpf");
  const contaDNum = searchParams.get("contaDestino");

  // Resgata a conta destino
  const resD = await fetch(`${env.localApi}/contas?numeroConta=${contaDNum}`);
  const contasDestino = await resD.json();
  const contaDestino = contasDestino[0];

  // Resgata a conta origem
  const resO = await fetch(`${env.localApi}/contas?usuarioCpf=${cpf}`);
  const contasOrigem = await resO.json();
  const contaOrigem = contasOrigem[0];

  // Depositando em uma conta destino e adicionando depósito no histórico
  let bodyDeposito = {
    id: generateUUID(),
    ...body,
    contaOrigem: Number(contaOrigem.numeroConta),
  };
  let novoDeposito = await fetch(`${env.localApi}/contas/${contaDestino.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      depositos: [...(contaDestino["depositos"] || []), bodyDeposito],
      saldo: contaDestino.saldo + body.valor,
    }),
  });

  // Deduzindo o valor do deposito na conta origem e adicionando transferência no histórico
  let bodyTransacao = {
    id: generateUUID(),
    ...body,
    contaDestino: Number(contaDNum),
  };

  let novaTransacao = await fetch(`${env.localApi}/contas/${contaOrigem.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      transferencias: [
        ...(contaDestino["transferencias"] || []),
        bodyTransacao,
      ],
    }),
  });

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
}
