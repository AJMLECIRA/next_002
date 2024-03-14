// createInvoice.js

// Import the Firebase Admin SDK
const admin = require('firebase-admin');

// Function to create a new Invoice document
async function createInvoice(invoiceData) {
  try {
    // Add the Invoice data to the Firestore collection
    const invoiceRef = await admin
      .firestore()
      .collection('invoices')
      .add(invoiceData);
    console.log('Invoice document created with ID:', invoiceRef.id);
    return invoiceRef.id; // Return the ID of the newly created invoice document
  } catch (error) {
    console.error('Error creating invoice document:', error);
    throw error;
  }
}

module.exports = createInvoice;
