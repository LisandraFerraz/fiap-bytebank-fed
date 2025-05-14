// Icones usados na aplicação
import { faHandHoldingDollar, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const byteIcons = {
  plus: faPlus,
  transaction: faRightLeft,
  investment: faPiggyBank,
  edit: faPenToSquare,
  delete: faTrashCan,
  show: faEye,
  hide: faEyeSlash,
  expanse: faArrowUp,
  deposit: faArrowDown,
  close: faXmark,
  addMoney: faHandHoldingDollar,
} as const;
