'use client';
import { storage } from '@/firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import puppeteer from 'puppeteer';

const firebaseStorageUpload = async (pdfBuffer) => {
  const storageRef = ref(storage, 'testPDFS/test3.pdf');
  const snapshot = await uploadBytes(storageRef, pdfBuffer);
  return getDownloadURL(snapshot.ref);
};

const generateWebpagePDF = async (req, res) => {
  console.log('generating web page for PDF');
  try {
    // Launch Puppeteer browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the webpage with the specified URL
    const basketId = req.query.basketId; // Extract basketId from query parameters
    console.log('BasketID :', basketId);
    if (!basketId) {
      throw new Error('BasketId query parameter is required.');
    }
    await page.goto(`http://localhost:3000/invoice?basketId=${basketId}`, {
      waitUntil: 'networkidle0',
    });

    // Generate PDF
    const pdfBuffer = await page.pdf();

    // Close the browser
    await browser.close();

    // Upload PDF to Firebase Storage
    const downloadURL = await firebaseStorageUpload(pdfBuffer);
    res.status(200).json({ url: downloadURL });
  } catch (error) {
    console.error('Error generating and uploading PDF:', error);
    res.status(500).json({ error: 'Failed to generate and upload PDF.' });
  }
};

export default generateWebpagePDF;
