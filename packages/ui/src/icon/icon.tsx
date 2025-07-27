import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byteIcons } from "./icons-list";

export type icons = keyof typeof byteIcons;

interface IconI {
  iconKey: icons;
  iconClass?: string;
}

export const Icon = ({ iconKey, iconClass }: IconI) => {
  return <FontAwesomeIcon className={iconClass} icon={byteIcons[iconKey]} />;
};
