import styles from "./shortcuts.module.scss";
import { icons } from "../../utils/types";
import { CustomLink } from "@components/custom-link/custom-link";
import { Icon } from "@bytebank/ui";

interface IShortcut {
  title: string;
  icon: icons;
  url: string;
}

export const Shortcuts = () => {
  const shortcuts: IShortcut[] = [
    {
      title: "PIX",
      icon: "pix",
      url: "/send-pix",
    },
    {
      title: "TED",
      icon: "transaction",
      url: "/send-TED",
    },
    {
      title: "Empréstimos",
      icon: "requestLoan",
      url: "/loan",
    },
    {
      title: "Adicionar dinheiro",
      icon: "addMoney",
      url: "/add-money",
    },
  ];

  return (
    <div className={styles.shortcut_item_group}>
      {shortcuts.map((sc: IShortcut, index) => (
        <CustomLink key={index} href={sc.url}>
          <div className={styles.shortcut_item}>
            <Icon iconKey={sc.icon} />
            <span>{sc.title}</span>
          </div>
        </CustomLink>
      ))}
    </div>
  );
};
