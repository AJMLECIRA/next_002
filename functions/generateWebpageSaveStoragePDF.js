const admin = require('firebase-admin');
const fetch = require('node-fetch');

if (admin.apps.length === 0) {
  admin.initializeApp();
}
const { getStorage } = require('firebase-admin/storage');

const firebaseStorageUpload = async (pdfBuffer, fileName) => {
  const storage = getStorage();
  const bucket = storage.bucket();
  const file = bucket.file(fileName);
  try {
    await file.save(pdfBuffer, {
      metadata: { contentType: 'application/pdf' },
    });
    const [downloadURL] = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2491',
    });
    return downloadURL;
  } catch (error) {
    console.error('Error uploading to Firebase Storage:', error);
    throw new Error('Failed to upload PDF to Firebase Storage');
  }
};

async function generateWebpageSaveStoragePDF() {
  console.log('Generating PDF From web page and then storing to firebase');
  const targetUrl =
    'https://mirrorworld-uk.co.uk/invoice?basketId=96f597fd-d141-46dd-9f96-a224edd02471';
  console.log(`Fetching URL: ${targetUrl}`);
  try {
    const response = await fetch(
      `https://mirrorworld-uk.co.uk/api/pdf/capturePage?url=${targetUrl}`
    );
    if (response.ok) {
      const pdfBuffer = await response.buffer(); // Use buffer() instead of blob()
      const fileName = 'testPDFS/test5.pdf';
      const downloadURL = await firebaseStorageUpload(pdfBuffer, fileName);
      console.log(`PDF available at: ${downloadURL}`);
    } else {
      console.error('Failed to capture page. Status:', response.status);
    }
  } catch (error) {
    console.error('Error capturing page:', error);
  }
}

module.exports = generateWebpageSaveStoragePDF;
