// Function to handle clicking the "Generate and Save PDF" button on the client browser
// create very simple pdf using pdfKit and saves to firebase Storage and saves locally
const generateAndSavePDF = async () => {
  try {
    // Make a request to the generate-storage-pdf API route
    const response = await fetch('/api/pdf/generate-storage-pdf');
    if (response.ok) {
      const data = await response.json();
      // Open the returned URL in a new tab
      // use 'data.url' to save locally or just 'url' to open in new tab
      window.open(data.url, '_blank');
    } else {
      throw new Error('Failed to generate and save PDF');
    }
  } catch (error) {
    console.error(error);
    alert('Failed to generate and save PDF');
  }
};
export default generateAndSavePDF;
