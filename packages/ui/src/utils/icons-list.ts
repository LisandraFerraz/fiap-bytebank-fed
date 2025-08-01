// Icones usados na aplicação
import {
  faInstagram,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRightLong,
  faBars,
  faChevronLeft,
  faChevronRight,
  faDatabase,
  faDiamond,
  faFileArrowDown,
  faFolderTree,
  faHandHoldingDollar,
  faMagnifyingGlassPlus,
  faMoneyBills,
  faMoneyBillTransfer,
  faPlus,
  faShieldHeart,
  faWrench,
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
  menu: faBars,
  igIcon: faInstagram,
  waIcon: faWhatsapp,
  ytIcon: faYoutube,
  database: faDatabase,
  adjust: faWrench,
  organize: faFolderTree,
  safety: faShieldHeart,
  magnifying: faMagnifyingGlassPlus,
  fileDownload: faFileArrowDown,
  chevLeft: faChevronLeft,
  chevRight: faChevronRight,
} as const;
