type ItemComData = {
  [key: string]: string | any;
};

export function OrderByDate(arr: ItemComData[]): ItemComData[] {
  return arr.sort((a, b) => {
    const keyA = Object.keys(a).find((k) => k.startsWith("data"));
    const keyB = Object.keys(b).find((k) => k.startsWith("data"));

    if (!keyA || !keyB) return 0;

    const [dayA, monthA, anoA] = a[keyA].split("-").map(Number);
    const [dayB, monthB, anoB] = b[keyB].split("-").map(Number);

    const dateA = new Date(anoA, monthA - 1, dayA).getTime();
    const dateB = new Date(anoB, monthB - 1, dayB).getTime();

    return dateB - dateA;
  });
}
