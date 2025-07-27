import { byteIcons } from "@components/icon/icons-list";
import { IDeposito, IEmprestimo, IPix, ITed } from "./interfaces/transaction";

// Key dos icons
export type icons = keyof typeof byteIcons;

export type transacao = IDeposito | IEmprestimo | ITed | IPix;
