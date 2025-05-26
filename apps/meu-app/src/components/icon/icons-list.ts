// Icones usados na aplicação
import {
  faArrowRightLong,
  faDiamond,
  faHandHoldingDollar,
  faMoneyBills,
  faMoneyBillTransfer,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
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
  transaction: faMoneyBillTransfer,
  investment: faPiggyBank,
  edit: faPenToSquare,
  delete: faTrashCan,
  show: faEye,
  hide: faEyeSlash,
  expanse: faArrowUp,
  deposit: faArrowDown,
  close: faXmark,
  addMoney: faMoneyBills,
  longArrow: faArrowRightLong,
  requestLoan: faHandHoldingDollar,
  pix: faDiamond,
} as const;
