const generateWebpageSaveLocalPDF = async () => {
  // save to local machine only
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

      // ###### Routine to download the PDF to the local machine ######
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = pdfUrl;
      // The download attribute specifies that the target will be downloaded when a user clicks on the hyperlink
      link.download = 'invoice.pdf'; // This is the file name for the downloaded file
      // Append link to the body
      document.body.appendChild(link);
      // Programmatically click the link to trigger the download
      link.click();
      // Remove the link from the body after triggering the download
      document.body.removeChild(link);
      // Revoke the URL object
      URL.revokeObjectURL(pdfUrl);
      // #################################################
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
export default generateWebpageSaveLocalPDF;
