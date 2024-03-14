// Import the Firebase Admin SDK
const admin = require('firebase-admin');

// Function to create or update a customer document in Firestore
async function createOrUpdateCustomer(customerData) {
  try {
    // Initialize customerId to undefined if not provided
    let customerId = customerData.id;

    // Create a reference to the 'customers' collection
    const customerCollection = admin.firestore().collection('customers');

    // Create a new customer document
    if (!customerId) {
      // Add the customer data to the collection and get the generated ID
      const newCustomerRef = await customerCollection.add(customerData);
      customerId = newCustomerRef.id;
      //console.log('New customer document created with ID:', customerId);
    } else {
      // Update an existing customer document
      const customerRef = customerCollection.doc(customerId);
      await customerRef.set(customerData, { merge: true });
      //console.log('Customer document updated with ID:', customerId);
    }

    // Return the customer ID
    return customerId;
  } catch (error) {
    console.error('Error creating or updating customer document:', error);
    throw error;
  }
}

// Export the function for use in other modules
module.exports = createOrUpdateCustomer;
