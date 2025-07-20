import { NextApiRequest, NextApiResponse } from "next";
import { env } from "../_environment/environment";
import { IConta } from "../../../utils/interfaces/conta";
import { IEmprestimo } from "../../../utils/interfaces/transaction";
import axios from "axios";

export default async function handleOrderedLoan(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { usuarioCpf } = req.query;
  const access_token = req.headers.authorization;
  // Lista e organiza os empréstimos por pagos e não pagos
  if (req.method === "GET") {
    const conta: IConta = await axios.get(
      `${env.NEST_API}/account?usuarioCpf=${usuarioCpf}`
    );

    const dataParsed: IConta = conta;

    const emprestimos = dataParsed.historicoEmprestimos;

    const pending = emprestimos.filter((em: IEmprestimo) => em.aberto === true);
    const paid = emprestimos.filter((em: IEmprestimo) => em.aberto === false);

    return res.status(200).json({
      loanPending: pending,
      paidLoan: paid,
      successMsg: "Empréstimos mapeados com sucesso.",
    });
  } else {
    return res
      .status(500)
      .json({ errorMessage: "Não foi possível listar os empréstimos." });
  }
}
