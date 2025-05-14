import Image from "next/image";
import styles from "./sidenav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftRight } from "@fortawesome/free-solid-svg-icons";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";

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
            <FontAwesomeIcon icon={faLeftRight} />
            Transferências
          </li>
          <li>
            <FontAwesomeIcon icon={faPiggyBank} />
            Investimentos
          </li>
        </ul>
      </div>
    </div>
  );
};
