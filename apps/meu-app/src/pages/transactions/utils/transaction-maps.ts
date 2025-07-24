import {
  FormatPeriodFilter,
  FormatTypeName,
} from "../../../utils/functions/format-type-names";
import {
  TransacationTypes,
  TransPeriod,
} from "../../../utils/interfaces/transaction";

export const transTypesMap = Object.keys(TransacationTypes).map((type) => ({
  label: FormatTypeName(type),
  value: TransacationTypes[type as keyof typeof TransacationTypes],
}));

export const transPeriodMap = Object.keys(TransPeriod).map((period) => ({
  label: FormatPeriodFilter(period),
  value: TransPeriod[period as keyof typeof TransPeriod],
}));
