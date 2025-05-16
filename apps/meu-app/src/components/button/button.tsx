import { icons } from "../../utils/mock/types";
import styles from "./button.module.scss";
import { Icon } from "@components/icon/icon";

export const Button = ({
  btnClass,
  text,
  iconKey,
}: {
  text: string;
  btnClass?: string;
  iconKey?: icons;
}) => {
  return (
    <button className={`${btnClass} ${styles.btn}`}>
      {iconKey && <Icon iconKey={iconKey} />}
      <span>{text}</span>
    </button>
  );
};
