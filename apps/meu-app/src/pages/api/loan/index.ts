import { NextApiRequest, NextApiResponse } from "next";
import { env } from "../_environment/environment";
import { IConta } from "../../../utils/interfaces/conta";
import { IEmprestimo } from "../../../utils/interfaces/transaction";

export default async function handleOrderLoan(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { usuarioCpf } = req.query;

  // Lista e organiza os empréstimos por pagos e não pagos
  if (req.method === "GET") {
    const conta = await fetch(
      `${env.NEST_API}/account/one?usuarioCpf=${usuarioCpf}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const dataParsed: IConta = await conta.json();

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
