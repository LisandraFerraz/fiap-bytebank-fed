import { IUsuario } from "../../../../utils/interfaces/user";
import { NextApiRequest, NextApiResponse } from "next";
import { getFetch } from "../../lib/functions/fetch";
import { env } from "../../_environment/environment";

// LOGIN
export default async function getUserHandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      errorMessage: "Método não permitdo.",
    });
  }

  const reqBody: { email: string; password: string } = req.body;

  const userData = await fetch(`${env.NEST_API}/user/login`, {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!userData) {
    return res
      .status(500)
      .json({ errorMessage: "Não foi possível listar os dados do usuário." });
  }

  const userFormat = await userData.json();

  const accountData = await fetch(
    `${env.NEST_API}/account/one?usuarioCpf=${userFormat.cpf}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!accountData) {
    return res
      .status(500)
      .json({ errorMessage: "Não foi possível listar os dados do conta." });
  }

  const accountFormat = await accountData.json();

  delete accountFormat.depositos;
  delete accountFormat.transferencias;
  delete accountFormat.historicoEmprestimos;

  return res.status(200).json({
    user: userFormat,
    account: accountFormat,
    successMessage: "Dados listados com sucesso",
  });
}
