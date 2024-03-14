// Import the Firebase Admin SDK
const admin = require('firebase-admin');

// Function to create or update a customer document in Firestore
async function finalUpdate(customerId, invoiceId, customer, invoiceData) {
  // Create a reference to the 'customers' collection
  const customerCollection = admin.firestore().collection('customers');
  const invoiceCollection = admin.firestore().collection('invoices');

  try {
    const customerRef = customerCollection.doc(customerId);
    await customerRef.set(customer, { merge: true });

    const invoiceRef = invoiceCollection.doc(invoiceId);
    await invoiceRef.set(invoiceData, { merge: true });

    return;
  } catch (error) {
    console.error(
      'Error updateing final documents customers and invoice:',
      error
    );
    throw error;
  }
}

// Export the function for use in other modules
module.exports = finalUpdate;
