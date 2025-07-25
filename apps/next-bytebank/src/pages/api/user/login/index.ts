import { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../../../core/environment/api-urls";
import { IConta } from "../../../../utils/interfaces/conta";
import { IUsuario } from "../../../../utils/interfaces/user";
import { serialize } from "cookie";
import { apiFetch } from "../../../../core/core-api";

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

  const loginResponse = await apiFetch<{
    access_token: { access_token: string };
  }>({
    url: `${env.NEST_API}/auth/login`,
    method: "POST",
    body: reqBody,
  });

  if (!loginResponse) {
    return res
      .status(500)
      .json({ errorMessage: "Não foi possível listar os dados do usuário." });
  }

  const { access_token } = loginResponse;

  const cookie = serialize("access_token", `${access_token}`, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  res.setHeader("Set-Cookie", cookie);

  const userData = await apiFetch<IUsuario>({
    url: `${env.NEST_API}/user/one`,
    method: "GET",
    access_token: `${access_token}`,
  });

  if (!userData.cpf) {
    return res
      .status(500)
      .json({ errorMessage: "Não foi possível listar os dados do conta." });
  }

  const accountData = await apiFetch<any>({
    url: `${env.NEST_API}/account?usuarioCpf=${userData.cpf}`,
    method: "GET",
    access_token: `${access_token}`,
  });

  const { account } = accountData;

  return res.status(200).json({
    user: userData,
    account: account,
    access_token: access_token,
    successMessage: "Dados listados com sucesso",
  });
}
