// generate-storage-pdf.js

import { storage } from '@/firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import PDFDocument from 'pdfkit';
import { Readable } from 'stream';

const firebaseStorageUpload = async (pdfBuffer) => {
  // location to be saved and name of File in firebase storage
  const storageRef = ref(storage, 'testPDFS/test3.pdf');
  const snapshot = await uploadBytes(storageRef, pdfBuffer);
  return getDownloadURL(snapshot.ref);
};

const createPDF = async (req, res) => {
  // Generate PDF using pdfKit
  const doc = new PDFDocument();
  const buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', async () => {
    const pdfBuffer = Buffer.concat(buffers);

    // Upload to Firebase Storage
    try {
      const downloadURL = await firebaseStorageUpload(pdfBuffer);
      res.status(200).json({ url: downloadURL });
    } catch (error) {
      console.error('Upload error:', error);
      res
        .status(500)
        .json({ error: 'Failed to upload PDF to Firebase Storage.' });
    }
  });

  doc
    .fontSize(25)
    .text(
      'This is a test PDF document Sent Direct to Storage for Harry using pdfKit Formating from a called API',
      100,
      100
    );
  doc.end();
};
export default createPDF;
