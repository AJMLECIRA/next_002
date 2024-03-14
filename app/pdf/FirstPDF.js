// FirstPDF.js
'use client';
import React from 'react';
import PDFDocument from 'pdfkit';

export default function FirstPDF() {
  let fs;
  if (typeof window === 'undefined') {
    // We are on the server-side
    fs = require('fs');
  }
  // Create a new PDF document
  const doc = new PDFDocument();
  // Set the font using the path to the copied Helvetica.afm file
  doc.font('/app/fonts/Helvetica.afm');
  // Pipe the PDF document to a buffer
  const buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    const pdfData = Buffer.concat(buffers);
    // Do something with the PDF data (e.g., save to Firebase or send via email)
    console.log('PDF data:', pdfData);
  });

  // Add content to the PDF document
  doc.text('Hello, this is your first PDF document!');

  // Finalize the PDF document
  doc.end();

  return null; // This component doesn't render anything directly
}
