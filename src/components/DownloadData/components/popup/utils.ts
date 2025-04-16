import { RefObject } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const handleDownloadPDF = async (ref: RefObject<HTMLDivElement>, name: string) => {
  if (!ref.current) {
    return;
  }

  // Take a snapshot of the area
  const canvas = await html2canvas(ref.current, { scale: 2 }); // Масштаб для кращої якості
  const imgData = canvas.toDataURL("image/png");

  // Get the dimensions of the canvas
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Convert canvas dimensions from pixels to millimeters (jsPDF uses mm)
  const pxToMm = 0.264583; // 1 px = 0.264583 mm
  const pdfWidth = canvasWidth * pxToMm;
  const pdfHeight = canvasHeight * pxToMm;

  // Generate a PDF with dynamic dimensions
  const pdf = new jsPDF({
    orientation: pdfWidth > pdfHeight ? "l" : "p", // landscape or portrait mode
    unit: "mm",
    format: [pdfWidth, pdfHeight], // dynamic size
  });

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${name}_${(new Date).toISOString()}.pdf`);
};