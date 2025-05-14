import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Icones usados na aplicação
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const byteIcons = {
  plus: faPlus,
  transaction: faRightLeft,
  investment: faPiggyBank,
  edit: faPenToSquare,
  delete: faTrashCan,
  show: faEye,
  hide: faEyeSlash,
  expanse: faArrowUp,
  deposit: faArrowDown,
} as const;

type icons = keyof typeof byteIcons;

interface IconI {
  iconKey: icons;
  iconClass?: string;
}

export const Icon = ({ iconKey, iconClass }: IconI) => {
  return <FontAwesomeIcon className={iconClass} icon={byteIcons[iconKey]} />;
};
