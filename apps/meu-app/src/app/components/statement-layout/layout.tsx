import styles from "./statement.module.scss";

export const StatementLayout = () => {
  return (
    <div className={styles.statLayout}>
      <div className={styles.balance}></div>
      <div className={styles.actions}></div>
    </div>
  );
};
