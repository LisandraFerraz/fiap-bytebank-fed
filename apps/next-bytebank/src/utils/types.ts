import { byteIcons } from "@bytebank/ui/utils/icons-list.js";
import { IDeposito, IEmprestimo, IPix, ITed } from "./interfaces/transaction";

// Key dos icons
export type icons = keyof typeof byteIcons;

export type transacao = IDeposito | IEmprestimo | ITed | IPix;

export type toastTypes = "success" | "error" | "warning";

export enum BtnClasses {
  CONFIRM = "CONFIRM",
  DEFAULT = "DEFAULT",
  HIGHLIGHT = "HIGHLIGHT",
  DELETE = "",
}
