export function FormatDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getUTCMonth();
  const day = date.getDay();

  const checkMD = (md: string) => {
    return md.length === 2 ? md : `0${md}`;
  };

  const dateParsed = `${checkMD(String(day))}-${checkMD(
    String(month)
  )}-${year}`;

  return dateParsed;
}
