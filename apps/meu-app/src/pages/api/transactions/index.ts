import { IConta } from "./../../../utils/interfaces/conta";
import { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../../core/environment/api-urls";
import { apiFetch } from "../../../core/core-api";

export default async function handleListTrans(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { usuarioCpf } = req.query;
    const access_token = req.headers.authorization;

    if (access_token && usuarioCpf) {
      const conta = await apiFetch<IConta>({
        url: `${env.NEST_API}/account?usuarioCpf=${usuarioCpf}`,
        method: "GET",
        access_token: `${access_token.replace("Bearer ", "")}`,
      });

      const transHistory = {
        depositos: conta.depositos,
        transferencias: conta.transferencias,
        historicoEmprestimos: conta.historicoEmprestimos,
      };

      const {
        depositos,
        transferencias,
        historicoEmprestimos,
        ...parsedConta
      } = conta;

      const accountDetails = {
        ...parsedConta,
      };

      return res.status(200).json({
        accountDetails,
        transHistory,
        successMsg: "Transferências da conta recuperadas com sucesso.",
      });
    }
  } else {
    return res
      .status(500)
      .json({ errorMessage: "Não foi possível litar as transaferências." });
  }
}
