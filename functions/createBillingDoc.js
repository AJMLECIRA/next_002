// Import the Firebase Admin SDK
const admin = require('firebase-admin');

// Function to create or update a customer document in Firestore
async function createBillingDoc(billingData) {
  try {
    // Create a reference to the 'billing' collection

    const billingCollection = admin.firestore().collection('billing');
    // Add the billing data to the collection and get the generated ID
    const newbillingRef = await billingCollection.add(billingData);
    const billingId = newbillingRef.id;

    // Return the customer ID
    return billingId;
  } catch (error) {
    console.error('Error creating or updating delviery document:', error);
    throw error;
  }
}

// Export the function for use in other modules
module.exports = createBillingDoc;
