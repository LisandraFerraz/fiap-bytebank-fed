import { byteIcons } from "../utils/icons-list";
import styles from "./button.module.scss";
import { Icon } from "@bytebank/ui";

type icons = keyof typeof byteIcons;

enum BtnClasses {
  CONFIRM = "CONFIRM",
  DEFAULT = "DEFAULT",
  HIGHLIGHT = "HIGHLIGHT",
  DELETE = "",
}

export const Button = ({
  btnClass,
  text,
  iconKey,
  addClass,
  click,
  type,
  disabled,
}: {
  text?: string;
  btnClass: BtnClasses;
  addClass?: string;
  iconKey?: icons;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  click?: () => void;
}) => {
  function handleClick() {
    if (click) {
      click();
    }
  }

  const getBtnClass = (btnC: BtnClasses) => {
    const btnClassMap: { [key: string]: string } = {
      [BtnClasses.CONFIRM]: styles.btn_confirm || "",
      [BtnClasses.DEFAULT]: styles.btn_default || "",
      [BtnClasses.HIGHLIGHT]: styles.btn_highlight || "",
      [BtnClasses.DELETE]: styles.btn_delete || "",
    };

    return btnClassMap[btnC];
  };

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={handleClick}
      className={`${getBtnClass(btnClass)} ${addClass} ${styles.btn}`}
    >
      {iconKey && <Icon iconKey={iconKey} />}
      <span>{text}</span>
    </button>
  );
};
