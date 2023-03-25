export async function printPage(printArea: any) {
  const thisWindow: any = window;

  await thisWindow.html2pdf(document.getElementById(printArea), {
    margin: 0.2,
    filename: "report.pdf",
    image: { type: "jpeg", quality: 0.98 },
    jsPDF: { unit: "in", format: "A4", orientation: "landscape" },
    pageBreak: {
      mode: "legacy",
      after: ".page-break",
    },
  });
}

export function paginat(data: any, i: any) {
  return `${
    data?.info?.cur_page > 1 && (i + 1) % 10 === 0
      ? data?.info?.cur_page + 1 + "0"
      : data?.info?.cur_page > 1
      ? data?.info?.cur_page + `${i + 1}`
      : i + 1
  }`;
}

export const currencyFormat = (amount: any) => {
  return Number(amount)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
