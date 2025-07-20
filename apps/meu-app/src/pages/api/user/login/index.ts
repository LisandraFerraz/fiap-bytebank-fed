import { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../_environment/environment";
import { serialize } from "cookie";

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

  const loginResponse = await fetch(`${env.NEST_API}/auth/login`, {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!loginResponse) {
    return res
      .status(500)
      .json({ errorMessage: "Não foi possível listar os dados do usuário." });
  }

  const { access_token } = await loginResponse.json();

  const cookie = serialize("access_token", access_token, {
    httpOnly: true,
    sameSite: "lax",
    // secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);

  const userData = await fetch(`${env.NEST_API}/user/one`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!userData) {
    return res
      .status(500)
      .json({ errorMessage: "Não foi possível listar os dados do conta." });
  }

  const userFormat = await userData.json();

  const accountData = await fetch(
    `${env.NEST_API}/account?usuarioCpf=${userFormat.cpf}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const accountFormat = await accountData.json();
  // const accountFormat = await accountData.json();

  delete accountFormat.depositos;
  delete accountFormat.transferencias;
  delete accountFormat.historicoEmprestimos;

  return res.status(200).json({
    user: userFormat,
    account: accountFormat,
    access_token: access_token,
    successMessage: "Dados listados com sucesso",
  });
}
