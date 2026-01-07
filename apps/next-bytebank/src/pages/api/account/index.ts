import { apiFetch } from "@bytebank/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getAccountData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { usuarioCpf } = req.query;
  const access_token = req.headers.authorization;

  const accountData = await apiFetch<any>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/account?usuarioCpf=${usuarioCpf}`,
    method: "GET",
    access_token: `${access_token}`,
  });

  const { account } = accountData;

  return res.status(200).json({
    account,
    successMessage: "Dados listados com sucesso",
  });
}
