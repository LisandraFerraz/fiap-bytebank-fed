import { NextResponse } from "next/server";
import { IConta } from "../../../utils/interfaces/conta";
import { IPix } from "../../../utils/interfaces/transaction";
import { IUsuario } from "../../../utils/interfaces/user";
import { env } from "../_environment/environment";
import { getFetch } from "../lib/functions/fetch";
import { hasEmptyValues } from "../lib/functions/has-empty-prop";
import { NextApiRequest, NextApiResponse } from "next";

export default async function sendPixHandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({
      errorMsg: `Método não permitido!`,
    });
  }

  const body: IPix = req.body;
  const { usuarioCpf } = req.query;

  if (usuarioCpf && !hasEmptyValues(body)) {
    // Recupera quem está enviando o dinheiro
    const pfsR = await getFetch<IUsuario[]>(
      `${env.localApi}/usuarios?cpf=${usuarioCpf}`
    );
    const pfR = pfsR[0];

    // Recupera o destinatário
    const pfsD = await getFetch<IUsuario[]>(`${env.localApi}/usuarios`);
    const pfD = pfsD.find(
      (u: IUsuario) => u.dadosBancarios.chavePix === String(body.chavePix)
    );

    if (pfR?.dadosBancarios.chavePix === String(body.chavePix)) {
      return res.status(405).json({
        errorMsg: `Você não pode enviar um PIX para a própria conta do Bytebank.`,
      });
    }
    if (!pfD) {
      return res.status(405).json({
        errorMsg: `Conta não encontrada. Verifique se a chave foi informada corretamente.`,
      });
    }

    console.log(pfsD);

    // // Recupera conta do remetente
    const accsR = await getFetch<IConta[]>(
      `${env.localApi}/contas?usuarioCpf=${usuarioCpf}`
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
          headers: {
            "Content-Type": "application/json",
          },
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
          headers: {
            "Content-Type": "application/json",
          },
        });

        return res.status(200).json({
          successMessage: `PIX realizado com sucesso no valor de R$ ${body.valor} para ${pfD?.nome}`,
        });
      } catch (error) {
        return res.status(500).json({
          errorMessage: "Não foi possível realizar o PIX.",
        });
      }
    } else {
      return res.status(405).json({
        errorMessage:
          "Seu saldo não é suficiente para enviar o valor indicado no PIX.",
      });
    }
  }
}
