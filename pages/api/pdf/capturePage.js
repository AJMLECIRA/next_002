import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    console.error('No URL provided');
    return res.status(400).send('URL parameter is required');
  }

  try {
    const decodedUrl = decodeURIComponent(url);
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Before navigating, log the attempt and the target URL
    console.log(`Attempting to navigate to: ${decodedUrl}`);

    const response = await page.goto(decodedUrl, { waitUntil: 'networkidle2' });
    const finalUrl = page.url();
    console.log(`Navigation complete. Final URL: ${finalUrl}`);

    if (finalUrl !== decodedUrl) {
      console.warn(
        `Redirect detected. Initial URL: ${decodedUrl}, Final URL: ${finalUrl}`
      );
    }

    // Log the attempt to wait for the '.main-content' selector
    console.log(`Waiting for the '.main-content' selector...`);
    const selectorFound = await page
      .waitForSelector('.main-content', { timeout: 60000 })
      .then(() => true)
      .catch(() => false);

    if (!selectorFound) {
      throw new Error(
        "The '.main-content' selector was not found within the timeout period."
      );
    }

    // Log the PDF generation attempt
    console.log(`Generating PDF for: ${finalUrl}`);
    const pdfBuffer = await page.pdf();
    console.log(`PDF generation successful for: ${finalUrl}`);

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error(`An error occurred during operation: ${error.message}`, {
      operation: error.operation || 'Unknown',
      url: error.url || 'N/A',
      stack: error.stack,
    });

    // Optionally, enhance the error response with more context
    res.status(500).send({
      message: 'An error occurred while capturing the page.',
      error: error.message,
      url: error.url || 'N/A',
    });
  }
}
