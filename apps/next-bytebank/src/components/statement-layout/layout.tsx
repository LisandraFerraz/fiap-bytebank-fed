import { Balance } from "@components/balance/balance";
import styles from "./statement.module.scss";

export const StatementLayout = ({ data }: { data: any }) => {
  return (
    <>
      <div className={styles.statLayout}>
        <Balance amount={data?.saldo} />
      </div>
    </>
  );
};
