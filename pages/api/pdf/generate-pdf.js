// /pages/api/pdf/generate-pdf.js
import PDFDocument from 'pdfkit';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipe = promisify(pipeline);

const handler = async (req, res) => {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  // res.setHeader('Content-Disposition', 'attachment; filename="test.pdf"');// used when saving to downloads
  res.setHeader('Content-Disposition', 'inline; filename="test.pdf"'); // used to open in a browser page

  // Add content to the PDF
  doc
    .fontSize(25)
    .text(
      'This is a test PDF document to be shown in hte browser and can be saved if required',
      100,
      100
    );
  doc.moveDown(); // Move the cursor down to ensure the next line of text does not overlap
  doc.fontSize(18).text('Here is another line of text.', 100, 250); // Adding another line of text

  doc.end();

  // It's important to pipe the PDF document stream to the response inside the promise handler of 'pipe'
  await pipe(doc, res).catch((err) => {
    // Handle streaming errors here
    console.error(err);
    res.status(500).end('Internal Server Error');
  });
};

export default handler;
