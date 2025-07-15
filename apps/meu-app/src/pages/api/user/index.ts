import { IUsuario } from "../../../utils/interfaces/user";
import { NextApiRequest, NextApiResponse } from "next";
import { getFetch } from "../lib/functions/fetch";
import { env } from "../_environment/environment";

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

  const dataFormated = await userData.json();

  if (userData) {
    return res
      .status(200)
      .json({
        data: dataFormated,
        successMessage: "Dados listados com sucesso",
      });
  }
  return res
    .status(500)
    .json({ errorMessage: "Não foi possível listar os dados do usuário." });
}
