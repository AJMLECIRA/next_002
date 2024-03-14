// Function to handle clicking the "Generate PDF" button
// create very simple pdf using pdfKit
const generatePDF = async () => {
  try {
    // Make a request to the generate-pdf API route
    const response = await fetch('/api/pdf/generate-pdf');
    if (response.ok) {
      const blob = await response.blob();
      // Create a URL for the PDF blob and open it in a new tab
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } else {
      throw new Error('Failed to generate PDF');
    }
  } catch (error) {
    console.error(error);
    alert('Failed to generate PDF');
  }
};
export default generatePDF;
