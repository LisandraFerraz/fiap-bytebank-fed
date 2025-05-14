import { ITransaction } from "../../../utils/mock/interfaces/transaction";

export const Transaction = ({ dataT }: { dataT: ITransaction }) => {
  return (
    <div>
      <p>{dataT.data}</p>
      <p>{dataT.tipo}</p>
      <p>{dataT.valor}</p>
    </div>
  );
};
