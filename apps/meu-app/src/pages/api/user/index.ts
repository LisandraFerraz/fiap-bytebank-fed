import { IUsuario } from "../../../utils/interfaces/user";
import { NextApiRequest, NextApiResponse } from "next";
import { getFetch } from "../lib/functions/fetch";
import { env } from "../_environment/environment";

export default async function getUserHandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      errorMessage: "Método não permitdo.",
    });
  }

  const { cpf } = req.query;

  const userData = await getFetch<IUsuario>(
    `${env.localApi}/usuarios?cpf=${cpf}`
  );

  if (userData) {
    return res
      .status(200)
      .json({ data: userData, successMessage: "Dados listados com sucesso" });
  }
  return res
    .status(500)
    .json({ errorMessage: "Não foi possível listar os dados do usuário." });
}
