import { Icon } from "@components/icon/icon";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function NewTransaction() {
  return (
    <div className={styles.transaction_layout}>
      <h2>Nova transação</h2>
      <Link href="/send-pix">
        <div className={styles.option}>
          <div className={styles.option_title}>
            <p>Realizar PIX</p> <Icon iconKey="longArrow" />
          </div>
          <div className={styles.saved_pix}>
            {/* adicionar contatos pix salvos */}
          </div>
        </div>
      </Link>
      <Link href="/send-TED">
        <div className={styles.option}>
          <div className={styles.option_title}>
            <p>Enviar via TED</p> <Icon iconKey="longArrow" />
          </div>
        </div>
      </Link>
      <Link href="/add-money">
        <div className={styles.option}>
          <div className={styles.option_title}>
            <p>Depositar</p> <Icon iconKey="longArrow" />
          </div>
        </div>
      </Link>
    </div>
  );
}
