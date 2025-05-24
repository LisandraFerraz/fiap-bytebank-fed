import { NextResponse } from "next/server";
import { IConta } from "../../../utils/interfaces/conta";
import { IPix } from "../../../utils/interfaces/transaction";
import { IUsuario } from "../../../utils/interfaces/user";
import { env } from "../_environment/environment";
import { getFetch } from "../lib/functions/fetch";
import { hasEmptyValues } from "../lib/functions/has-empty-prop";

export async function POST(request: Request) {
  const body: IPix = await request.json();
  const { searchParams } = new URL(request.url);
  const cpf = searchParams.get("cpf");

  if (cpf && !hasEmptyValues(body)) {
    // Recupera quem está enviando o dinheiro
    const pfsR = await getFetch<IUsuario[]>(
      `${env.localApi}/usuarios?cpf=${cpf}`
    );
    const pfR = pfsR[0];

    // Recupera o destinatário
    const pfsD = await getFetch<IUsuario[]>(`${env.localApi}/usuarios`);
    const pfD = pfsD.find(
      (u: IUsuario) => u.dadosBancarios.chavePix === body.chavePix
    );

    // Recupera conta do remetente
    const accsR = await getFetch<IConta[]>(
      `${env.localApi}/contas?usuarioCpf=${cpf}`
    );
    const accR: IConta = accsR[0];

    // Recupera conta do remetente
    const accsD = await getFetch<IConta[]>(
      `${env.localApi}/contas?usuarioCpf=${pfD?.cpf}`
    );
    const accD = accsD[0];

    // Verifica se o saldo é suficiente para enviar o PIX
    if (accR.saldo >= body.valor) {
      try {
        await fetch(`${env.localApi}/contas/${String(accD.id)}`, {
          method: "PATCH",
          body: JSON.stringify({
            ...accD,
            saldo: accD.saldo + body.valor,
            depositos: [
              ...(accR["depositos"] || []),
              {
                ...body,
                contaOrigem: `${accR.numeroConta}-${accR.digito}`,
                remetente: pfR.nome,
                cpfRemetente: pfR.cpf,
              },
            ],
          }),
        });
        await fetch(`${env.localApi}/contas/${String(accR.id)}`, {
          method: "PATCH",
          body: JSON.stringify({
            ...accR,
            saldo: accR.saldo - body.valor,
            transferencias: [
              ...(accR["transferencias"] || []),
              {
                ...body,
                contaDestino: `${accD.numeroConta}-${accD.digito}`,
                destinatario: pfD?.nome,
                cpfDestinatario: pfD?.cpf,
              },
            ],
          }),
        });

        return NextResponse.json(
          {
            successMessage: `PIX realizado com sucesso no valor de R$ ${body.valor} para ${pfD?.nome}`,
          },
          { status: 200 }
        );
      } catch (error) {
        return NextResponse.json(
          { errorMessage: "Não foi possível realizar o PIX." },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        {
          errorMessage:
            "Seu saldo não é suficiente para enviar o valor indicado no PIX.",
        },
        { status: 400 }
      );
    }
  }
}
