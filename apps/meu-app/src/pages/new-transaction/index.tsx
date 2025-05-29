import { Icon } from "@components/icon/icon";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function NewTransaction() {
  return (
    <div className={styles.transaction_layout}>
      <h2>Registrar transações</h2>
      <Link href="/send-pix">
        <div className={styles.option}>
          <div className={styles.option_title}>
            <p>Registrar envio de PIX</p> <Icon iconKey="longArrow" />
          </div>
          <div className={styles.saved_pix}>
            {/* adicionar contatos pix salvos */}
          </div>
        </div>
      </Link>
      <Link href="/send-TED">
        <div className={styles.option}>
          <div className={styles.option_title}>
            <p>Registrar envio de TED</p> <Icon iconKey="longArrow" />
          </div>
        </div>
      </Link>
      <Link href="/add-money">
        <div className={styles.option}>
          <div className={styles.option_title}>
            <p>Registrar novo depósito</p> <Icon iconKey="longArrow" />
          </div>
        </div>
      </Link>
      <Link href="/loan">
        <div className={styles.option}>
          <div className={styles.option_title}>
            <p>Registrar novo empréstimo</p> <Icon iconKey="longArrow" />
          </div>
        </div>
      </Link>
    </div>
  );
}
