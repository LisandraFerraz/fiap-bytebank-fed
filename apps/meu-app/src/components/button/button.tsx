import { icons } from "../../utils/types";
import styles from "./button.module.scss";
import { Icon } from "@components/icon/icon";

export enum BtnClasses {
  CONFIRM = "CONFIRM",
  DEFAULT = "DEFAULT",
  DELETE = "",
}

export const Button = ({
  btnClass,
  text,
  iconKey,
  click,
}: {
  text: string;
  btnClass: BtnClasses;
  iconKey?: icons;
  click?: () => void;
}) => {
  function handleClick() {
    if (click) {
      click();
    }
  }

  const getBtnClass = (btnC: BtnClasses) => {
    const btnClassMap: { [key: string]: string } = {
      [BtnClasses.CONFIRM]: styles.btn_confirm,
      [BtnClasses.DEFAULT]: styles.btn_default,
      [BtnClasses.DELETE]: styles.btn_delete,
    };

    return btnClassMap[btnC];
  };

  return (
    <button
      onClick={handleClick}
      className={`${getBtnClass(btnClass)} ${styles.btn}`}
    >
      {iconKey && <Icon iconKey={iconKey} />}
      <span>{text}</span>
    </button>
  );
};
