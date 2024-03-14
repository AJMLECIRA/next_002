// File: createInvoicePDF.js
const functions = require('firebase-functions');
const puppeteer = require('puppeteer'); // Use puppeteer-core
const admin = require('firebase-admin');

if (admin.apps.length === 0) {
  admin.initializeApp();
}

exports.createInvoicePDF = functions.https.onRequest(async (req, res) => {
  const { basketId } = req.query;
  if (!basketId) {
    return res.status(400).send('BasketId query parameter is required.');
  }

  try {
    const browser = await puppeteer.launch({
      // args: chromeLambda.args,
      // executablePath: await chromeLambda.executablePath,
      // headless: chromeLambda.headless,
    });
    const page = await browser.newPage();

    // Be sure to replace localhost with your actual domain in production
    await page.goto(`localhost:3000/invoice?basketId=${basketId}`, {
      waitUntil: 'networkidle0',
    });

    // After navigating to the page, wait for the main content to be loaded
    await page.waitForSelector('.main-content', { timeout: 60000 });

    const pdfOptions = {
      format: 'A4',
      printBackground: true,
    };

    const pdfBuffer = await page.pdf(pdfOptions);

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Failed to create invoice PDF:', error);
    res.status(500).send('Internal server error');
  }
});
