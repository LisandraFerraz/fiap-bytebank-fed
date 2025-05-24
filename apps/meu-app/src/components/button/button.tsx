import { icons } from "../../utils/types";
import styles from "./button.module.scss";
import { Icon } from "@components/icon/icon";

export const Button = ({
  btnClass,
  text,
  iconKey,
  click,
}: {
  text: string;
  btnClass?: string;
  iconKey?: icons;
  click?: () => void;
}) => {
  function handleClick() {
    if (click) {
      click();
    }
  }

  return (
    <button onClick={handleClick} className={`${btnClass} ${styles.btn}`}>
      {iconKey && <Icon iconKey={iconKey} />}
      <span>{text}</span>
    </button>
  );
};
