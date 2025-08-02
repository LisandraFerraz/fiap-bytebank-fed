import { NextApiRequest, NextApiResponse } from "next";
import { apiFetch } from "../../../../core/core-api";
import { IConta } from "../../../../utils/interfaces/conta";
import { TransacationTypes } from "../../../../utils/interfaces/transaction";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ errorMessage: "Método não permitido." });
  }

  const { usuarioCpf } = req.query;
  const access_token = req.headers.authorization;

  if (!usuarioCpf || !access_token) {
    return res
      .status(401)
      .json({ errorMessage: "Informe o token de acesso e CPF do usuáiro." });
  }

  const conta = await apiFetch<IConta>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/account?usuarioCpf=${usuarioCpf}`,
    method: "GET",
    access_token: `${access_token}`,
  });

  const { transacoes } = conta.transacoesList;

  const tedTransacoes = transacoes.filter(
    (tf) => tf.tipo === TransacationTypes.TED
  );
  const pixTransacoes = transacoes.filter(
    (tf) => tf.tipo === TransacationTypes.PIX
  );

  const expansesData = [
    {
      name: "PIX",
      value: pixTransacoes.reduce((acc, curr) => acc + curr.valor, 0),
    },
    {
      name: "TED",
      value: tedTransacoes.reduce((acc, curr) => acc + curr.valor, 0),
    },
  ];

  return res.status(200).json({ data: expansesData });
}
