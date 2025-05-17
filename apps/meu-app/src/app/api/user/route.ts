import { NextResponse } from "next/server";
import { endpoints } from "../_environment/endpoints";
import { coreApi } from "../core/core-api";
import { IConta } from "../../../utils/interfaces/conta";

/*
 * Retorna um json com os dados do usuário
 * e sua conta bancária (incluindo as transações)
 * com base na busca
 *  conforme o search param "cpf"
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cpf = searchParams.get("cpf");

  const userRes = await coreApi({
    url: `${endpoints.usuarios}?cpf=${cpf}`,
    method: "GET",
  });

  const contasRes = await coreApi({
    url: endpoints.contas,
    method: "GET",
    params: {},
  });

  const { userData, contasData } = {
    userData: await userRes.json(),
    contasData: await contasRes.json(),
  };

  const userAcc = {
    usuario: userData,
    contaBancaria: contasData.find(
      (conta: IConta) => conta.usuarioCpf === userData.cpf
    ),
  };

  return NextResponse.json({ userAcc }, { status: 200 });
}
