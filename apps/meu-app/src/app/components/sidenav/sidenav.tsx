import Image from "next/image";
import styles from "./sidenav.module.scss";
import { Icon } from "components/icon/icon";

export const Sidenav = () => {
  return (
    <div className={styles.sidenav}>
      <Image
        src="/bytebank-logo.svg"
        alt="Descriptive text for screen readers"
        width={170}
        height={40}
      />
      <div>
        <ul>
          <li>
            <Icon iconKey="transaction" />
            Transferências
          </li>
          <li>
            <Icon iconKey="investment" />
            Investimentos
          </li>
        </ul>
      </div>
    </div>
  );
};
