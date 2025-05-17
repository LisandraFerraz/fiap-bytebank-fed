import { NextResponse } from "next/server";
import { coreApi } from "../core/core-api";
import { IConta } from "../../../utils/interfaces/conta";
import { IAgencia } from "../../../utils/interfaces/agencia";
import { IUsuarioConta } from "../../../utils/interfaces/user";
import { error } from "console";

/*
 * Retorna um json com os dados do usuário
 * e sua conta bancária (incluindo as transações)
 * conforme o search param "cpf"
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cpf = searchParams.get("cpf");

  const { userRes, agenciasRes, contasRes } = {
    userRes: await coreApi({
      url: `usuarios?cpf=${cpf}`,
      method: "GET",
    }),
    agenciasRes: await coreApi({
      url: "agencias",
      method: "GET",
    }),
    contasRes: await coreApi({
      url: "contas",
      method: "GET",
    }),
  };

  const { userData, agenciasData, contasData } = {
    userData: await userRes.json(),
    agenciasData: await agenciasRes.json(),
    contasData: await contasRes.json(),
  };

  const contaB = contasData.find((conta: IConta) => conta.usuarioCpf === cpf);

  let data: IUsuarioConta;

  if (contaB) {
    data = {
      usuario: userData,
      contaBancaria: {
        ...contaB,
        agencia: agenciasData.find(
          (a: IAgencia) => a.digito === contaB?.agencia
        ),
      },
    };
    return NextResponse.json({ data }, { status: 200 });
  }
  return NextResponse.json(
    { errorMessage: "Não foi possível listar os dados do usuário." },
    { status: 500 }
  );
}
