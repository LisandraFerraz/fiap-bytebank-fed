import { NewAccoutnBody } from "@/utils/classes/login";
import { NextApiRequest, NextApiResponse } from "next";

export default async function HandleSignup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(401).json({
      errorMessage: "Método não autorizado.",
    });
  }

  const { usuarioCpf } = req.query;

  if (!usuarioCpf) {
    return res.status(500).json({
      errorMessage: "É necessário informar o CPF do usuário.",
    });
  }

  const genNumSequence = (count: number): number => {
    const randomInts = Array.from({ length: count }, () =>
      Math.floor(Math.random() * 9)
    );

    let parsed = randomInts.join("");
    return Number(parsed);
  };

  // Substituir para um body. deixar a pessoa preencher esses campos menos o cpf usar o  do login
  let body: NewAccoutnBody = {
    usuarioCpf: `${usuarioCpf}`,
    agencia: String(),
    digito: genNumSequence(1),
    linhaCredito: 10000,
    numeroConta: genNumSequence(6),
    saldo: 5000,
  };
}
