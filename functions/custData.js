// custData.js
const admin = require('firebase-admin');

// Function to retrieve customer information from an order document
async function getBillInfo(orderId) {
  try {
    const orderDoc = await admin
      .firestore()
      .collection('orders')
      .doc(orderId)
      .get();
    return orderDoc.data().billInfo; // Assuming 'customer' is a field within the order document
  } catch (error) {
    console.error('Error retrieving customer information from order:', error);
    throw error;
  }
}

// Function to retrieve customer information from an order document
async function getCustomer(orderId) {
  try {
    const orderDoc = await admin
      .firestore()
      .collection('orders')
      .doc(orderId)
      .get();
    return orderDoc.data().customer; // Assuming 'customer' is a field within the order document
  } catch (error) {
    console.error('Error retrieving customer information from order:', error);
    throw error;
  }
}

// Function to retrieve delivery address information from an order document
async function getDeliveryAddress(orderId) {
  try {
    const orderDoc = await admin
      .firestore()
      .collection('orders')
      .doc(orderId)
      .get();
    return orderDoc.data().delAddInfo; // Assuming 'deliveryAddress' is a field within the order document
  } catch (error) {
    console.error('Error retrieving delivery address from order:', error);
    throw error;
  }
}

// Function to retrieve billing address information from an order document
async function getBillingAddress(orderId) {
  try {
    const orderDoc = await admin
      .firestore()
      .collection('orders')
      .doc(orderId)
      .get();
    return orderDoc.data().billAddInfo; // Assuming 'billingAddress' is a field within the order document
  } catch (error) {
    console.error('Error retrieving billing address from order:', error);
    throw error;
  }
}

module.exports = {
  getCustomer,
  getDeliveryAddress,
  getBillingAddress,
  getBillInfo,
};
