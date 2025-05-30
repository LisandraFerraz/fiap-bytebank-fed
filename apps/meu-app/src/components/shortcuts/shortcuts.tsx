import styles from "./shortcuts.module.scss";
import { Icon } from "@components/icon/icon";
import { icons } from "../../utils/types";
import { CustomLink } from "@components/custom-link/custom-link";

interface IShortcut {
  title: string;
  icon: icons;
  url: string;
}

export const Shortcuts = () => {
  const shortcuts: IShortcut[] = [
    {
      title: "Empréstimos",
      icon: "requestLoan",
      url: "/loan",
    },
    {
      title: "PIX",
      icon: "pix",
      url: "/send-pix",
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
