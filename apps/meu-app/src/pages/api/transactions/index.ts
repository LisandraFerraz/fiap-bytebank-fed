import { NextApiRequest, NextApiResponse } from "next";
import { env } from "../_environment/environment";
import axios from "axios";
import { IConta } from "../../../utils/interfaces/conta";

export default async function handleListTrans(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { usuarioCpf } = req.query;
    const access_token = req.headers.authorization;

    const conta: IConta = await axios.get(
      `${env.NEST_API}/account?usuarioCpf=${usuarioCpf}`
    );

    const transHistory = {
      depositos: conta.depositos,
      transferencias: conta.transferencias,
      historicoEmprestimos: conta.historicoEmprestimos,
    };

    const { depositos, transferencias, historicoEmprestimos, ...parsedConta } =
      conta;

    const accountDetails = {
      ...parsedConta,
    };

    return res.status(200).json({
      accountDetails,
      transHistory,
      successMsg: "Transferências da conta recuperadas com sucesso.",
    });
  } else {
    return res
      .status(500)
      .json({ errorMessage: "Não foi possível listar os dados do conta." });
  }
}
