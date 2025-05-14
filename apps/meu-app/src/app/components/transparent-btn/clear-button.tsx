import styles from "./clear-button.module.scss";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";

interface IClearBtn {
  text: string;
  // icon:
}

export const ClearButton = ({ text }: { text: string }) => {
  return <button className={styles.btn}>{text}</button>;
};
