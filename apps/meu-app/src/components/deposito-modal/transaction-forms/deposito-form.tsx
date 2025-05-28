import { IDeposito } from "../../../utils/interfaces/transaction";

export const DepositForm = ({ data }: { data: any }) => {
  return (
    <>
      <p>{data.valor}</p>
      <p>{data.tipo}</p>
    </>
  );
};
