import { NextApiRequest, NextApiResponse } from "next";
import { getFetch } from "../lib/functions/fetch";
import { env } from "../_environment/environment";
import { IConta } from "../../../utils/interfaces/conta";
import { getMonthName } from "../../../utils/functions/format-month-names";

export default async function getAccountHandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      errorMessage: "Método não permitdo.",
    });
  }

  const { cpf } = req.query;

  const contasRes = await getFetch<IConta[]>(
    `${env.localApi}/contas?usuarioCpf=${cpf}`
  );

  const conta = contasRes[0];

  const accTransaction = Object.values(conta).filter((a: any) =>
    Array.isArray(a)
  );
  const transactions = accTransaction.flat();

  const getMonth = (month: string): string => {
    const mo = month.slice(3, 7).slice(0, 2);
    return `${mo}`;
  };

  const transactionPerMonth = transactions.reduce((acc: any[], curr: any) => {
    if (!curr) return acc;

    const monthName = getMonthName[getMonth(curr.data)];

    let monthGroup = acc.find((item) => item.mes === monthName);

    if (!monthGroup) {
      monthGroup = {
        mes: monthName,
        data: curr.data.replace(/-/g, "/"),
        transferencias: [],
      };
      acc.push(monthGroup);
    }

    monthGroup.transferencias.push(curr);

    return acc;
  }, []);

  delete (conta as any).historicoEmprestimos;
  delete (conta as any).depositos;
  delete (conta as any).transferencias;

  if (conta && transactionPerMonth) {
    return res.status(200).json({
      data: {
        accDetails: conta,
        transactions: transactionPerMonth,
      },
      successMessage: "Dados da conta recuperados com sucesso.",
    });
  } else {
    return res.status(500).json({
      errorMessage: "Não foi possível recuperar os dados da conta.",
    });
  }
}
