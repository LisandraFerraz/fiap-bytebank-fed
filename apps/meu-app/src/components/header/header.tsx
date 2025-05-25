// header
import styles from "./header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export const Header = () => {
  const name = "Joana";

  return (
    <div className={styles.header}>
      <div>Olá, {name}! :)</div>
      <div>
        {name}
        <FontAwesomeIcon icon={faCircleUser} />
      </div>
    </div>
  );
};
