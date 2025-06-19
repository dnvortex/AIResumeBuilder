import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export async function generatePDF(element: HTMLElement, filename: string = "resume") {
  try {
    // Create canvas from the DOM element
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable CORS for images
      logging: false,
      backgroundColor: "#ffffff"
    });
    
    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const heightLeft = imgHeight;
    
    // Create PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    const position = 0;
    
    // Add image to PDF
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
    
    // Save the PDF
    pdf.save(`${filename.replace(/\s+/g, '_')}.pdf`);
    
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF");
  }
}
