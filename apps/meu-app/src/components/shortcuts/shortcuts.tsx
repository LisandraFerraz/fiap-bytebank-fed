import Link from "next/link";
import styles from "./shortcuts.module.scss";
import { Icon } from "@components/icon/icon";
import { byteIcons } from "@components/icon/icons-list";
import { icons } from "../../utils/types";

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
        <Link href={sc.url}>
          <div className={styles.shortcut_item}>
            <Icon iconKey={sc.icon} />
            <span>{sc.title}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};
