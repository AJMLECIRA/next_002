// orderRef.js
const admin = require('firebase-admin');

// Function to generate an order reference
async function generateOrderReference() {
  try {
    // Retrieve the last invoice number from the invoices collection
    const lastInvoiceSnapshot = await admin
      .firestore()
      .collection('invoices')
      .orderBy('invoiceNumber', 'desc')
      .limit(1)
      .get();

    let nextInvoiceNumber;
    if (!lastInvoiceSnapshot || lastInvoiceSnapshot.empty) {
      // If there are no invoices, start at 60000
      nextInvoiceNumber = 60000;
    } else {
      // Increment the last invoice number by 1
      nextInvoiceNumber = lastInvoiceSnapshot.docs[0].data().invoiceNumber + 1;
    }

    // Generate the new invoice number and invoice reference based on the retrieved invoice number
    const newInvNum = nextInvoiceNumber;

    // Get the current date for creating the invoice reference
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1

    // Format the invoice reference as "invoiceNumber/dayOfMonth/month"
    const invRef = `${nextInvoiceNumber}/${
      dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth
    }${month < 10 ? '0' + month : month}`;

    return { newInvNum, invRef };
  } catch (error) {
    console.error('Error generating order reference:', error);
    throw error; // Propagate the error for handling in the caller function
  }
}

module.exports = generateOrderReference;
