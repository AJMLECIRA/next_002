// Import the Firebase Admin SDK
const admin = require('firebase-admin');

// Function to create or update a customer document in Firestore
async function createDeliveryDoc(deliveryData) {
  try {
    // Create a reference to the 'delivery' collection

    const deliveryCollection = admin.firestore().collection('delivery');
    // Add the delivery data to the collection and get the generated ID
    const newDeliveryRef = await deliveryCollection.add(deliveryData);
    const deliveryId = newDeliveryRef.id;

    // Return the customer ID
    return deliveryId;
  } catch (error) {
    console.error('Error creating or updating delviery document:', error);
    throw error;
  }
}

// Export the function for use in other modules
module.exports = createDeliveryDoc;
