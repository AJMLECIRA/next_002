// Function to handle clicking the "Generate and Save a web page gernetated invoice into a PDF" from a client browser
const generateWebpagePDF = async () => {
  // #### Test ####
  console.log('Generating PDF From web page');
  const targetUrl = encodeURIComponent(
    'http://localhost:3000/invoice?basketId=6b8c5cfc-bbb0-446b-bb52-6e074523d0ce'
  );
  try {
    // Fetch the PDF from the API endpoint
    const response = await fetch(`/api/pdf/capturePage?url=${targetUrl}`);
    if (response.ok) {
      // Convert the response to a Blob if the request was successful
      console.log(response);
      const pdfBlob = await response.blob();
      // Create a URL for the PDF Blob and open it in a new tab
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    } else {
      // Alert the user if the fetch request failed
      alert('Failed to capture page.');
    }
  } catch (error) {
    // Log and alert the user of any errors
    console.error('Error capturing page:', error);
    alert('An error occurred while capturing the page.');
  }
};
export default generateWebpagePDF;
