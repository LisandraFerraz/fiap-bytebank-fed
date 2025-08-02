import { NextApiRequest, NextApiResponse } from "next";
import { IConta } from "../../../utils/interfaces/conta";
import { IEmprestimo } from "../../../utils/interfaces/transaction";
import { apiFetch } from "../../../core/core-api";

export default async function handleOrderedLoan(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { usuarioCpf } = req.query;
  const access_token = req.headers.authorization;
  // Lista e organiza os empréstimos por pagos e não pagos
  if (req.method === "GET") {
    if (access_token && usuarioCpf) {
      const response = await apiFetch<IConta>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/account?usuarioCpf=${usuarioCpf}`,
        method: "GET",
        access_token: `${access_token}`,
      });

      const { transacoesList } = response;

      const emprestimos = transacoesList.transacoes;

      const pending = emprestimos.filter(
        (em: IEmprestimo) => em.aberto === true
      );
      const paid = emprestimos.filter((em: IEmprestimo) => em.aberto === false);

      return res.status(200).json({
        loanPending: pending,
        paidLoan: paid,
        successMsg: "Empréstimos mapeados com sucesso.",
      });
    }
  } else {
    return res
      .status(500)
      .json({ errorMessage: "Não foi possível listar os empréstimos." });
  }
}
