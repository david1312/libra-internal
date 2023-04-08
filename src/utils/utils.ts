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

export const currencyFormat = (amount: any, delimiter: number = 2) => {
  return Number(amount)
    .toFixed(delimiter)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

export const formatNumber = (amount: any, delimiter: number = 2) => {
  if (!amount) {
    return "0";
  }
  return amount.toLocaleString("en-us", {
    minimumFractionDigits: delimiter,
    maximumFractionDigits: delimiter,
  });
};

export const transformDate = (value: string = "") => {
  if (!value) {
    return "";
  }
  const splitted = value.split("-");
  switch (splitted[1]) {
    case "01":
      return `${splitted[2]} Januari ${splitted[0]}`;
    case "02":
      return `${splitted[2]} Februari ${splitted[0]}`;
    case "03":
      return `${splitted[2]} Maret ${splitted[0]}`;
    case "04":
      return `${splitted[2]} April ${splitted[0]}`;
    case "05":
      return `${splitted[2]} Mei ${splitted[0]}`;
    case "06":
      return `${splitted[2]} Juni ${splitted[0]}`;
    case "07":
      return `${splitted[2]} Juli ${splitted[0]}`;
    case "08":
      return `${splitted[2]} Agustus ${splitted[0]}`;
    case "09":
      return `${splitted[2]} September ${splitted[0]}`;
    case "10":
      return `${splitted[2]} Oktober ${splitted[0]}`;
    case "11":
      return `${splitted[2]} November ${splitted[0]}`;
    case "12":
      return `${splitted[2]} Desember ${splitted[0]}`;
    default:
      return value;
  }
};

export const transformDateDB = (value: string = "") => {
  if (!value) {
    return "";
  }
  const splitted = value.split("T");
  return splitted[0];
};
