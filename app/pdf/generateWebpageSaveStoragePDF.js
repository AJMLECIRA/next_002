import { storage } from '@/firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseStorageUpload = async (pdfBlob, fileName) => {
  try {
    // Location to be saved and name of File in firebase storage
    const storageRef = ref(storage, fileName);
    // Upload the PDF blob
    const snapshot = await uploadBytes(storageRef, pdfBlob);
    // Get and return the download URL
    return getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error('Error uploading to Firebase Storage:', error);
    throw new Error('Failed to upload PDF to Firebase Storage');
  }
};

const generateWebpageSaveStoragePDF = async () => {
  console.log('Generating PDF From web page and then storing to firebase');
  const targetUrl = encodeURIComponent(
    'http://mirrorworld-uk.co.uk/invoice?basketId=96f597fd-d141-46dd-9f96-a224edd02471'
  );
  try {
    // Fetch the PDF from the API endpoint using puppeteer
    const response = await fetch(`/api/pdf/capturePage?url=${targetUrl}`);
    if (response.ok) {
      // Convert the response to a Blob if the request was successful
      console.log(response);
      const pdfBlob = await response.blob();
      const fileName = 'testPDFS/test8.pdf';
      firebaseStorageUpload(pdfBlob, fileName);
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

export default generateWebpageSaveStoragePDF;
