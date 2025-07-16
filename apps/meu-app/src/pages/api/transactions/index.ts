import { NextApiRequest, NextApiResponse } from "next";
import { env } from "../_environment/environment";

export default async function handleListTrans(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { usuarioCpf } = req.query;

    const conta = await fetch(
      `${env.NEST_API}/account/one?usuarioCpf=${usuarioCpf}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const parsedConta = await conta.json();

    const transHistory = {
      depositos: parsedConta.depositos,
      transferencias: parsedConta.transferencias,
      historicoEmprestimos: parsedConta.historicoEmprestimos,
    };

    delete parsedConta.depositos;
    delete parsedConta.transferencias;
    delete parsedConta.historicoEmprestimos;

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
