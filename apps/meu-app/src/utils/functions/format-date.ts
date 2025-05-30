import { getMonthName } from "./format-month-names";

export function FormatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const checkMD = (md: string) => {
    return md.length === 2 ? md : `0${md}`;
  };

  const dateParsed = `${checkMD(String(day))}-${checkMD(
    String(month)
  )}-${year}`;

  return dateParsed;
}

export function FormatDateSlash(date: string): string {
  return date.replace(/-/g, "/");
}

export function FormatDateName(date: Date): string {
  const parsedData = FormatDate(date);

  const day = parsedData.slice(0, 2);
  const month = getMonthName[parsedData.slice(3, 5)];
  const year = parsedData.slice(6, 10);

  return `${day} de ${month} de ${year}`;
}
