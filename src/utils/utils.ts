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
