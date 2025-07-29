import { TransacationTypes, TransPeriod } from "../interfaces/transaction";
import { FormatPeriodFilter, FormatTypeName } from "./format-type-names";

export const transTypesMap = Object.keys(TransacationTypes).map((type) => ({
  label: FormatTypeName(type),
  value: TransacationTypes[type as keyof typeof TransacationTypes],
}));

export const transPeriodMaps = Object.keys(TransPeriod).map((period) => ({
  label: FormatPeriodFilter(period),
  value: TransPeriod[period as keyof typeof TransPeriod],
}));
