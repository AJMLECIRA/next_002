// stripe.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const generateStripeSignature = require('./stripeSignature');
const generateOrderReference = require('./orderRef');
const {
  getBillInfo,
  getCustomer,
  getDeliveryAddress,
  getBillingAddress,
} = require('./custData');
const createInvoice = require('./createInvoice');
const createOrUpdateCustomer = require('./createCustomer');
const createDeliveryDoc = require('./createDeliveryDoc');
const createBillingDoc = require('./createBillingDoc');
const finalUpdate = require('./finalUpdate');
const generateWebpageSaveStoragePDF = require('./generateWebpageSaveStoragePDF');
const createInvoicePDF = require('./createInvoicePDF');

if (admin.apps.length === 0) {
  // Checks if any Firebase app is already initialized
  admin.initializeApp(); // Initialize if no app is initialized
}

// Stripe Webhook Listener Function
exports.stripeWebhookListener = functions.https.onRequest(
  async (request, response) => {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    // Verify the request is coming from Stripe
    const sig = request.headers['stripe-signature'];
    if (!sig) {
      return response
        .status(400)
        .send('Bad Request: No stripe-signature header value provided.');
    }

    // Verify signature
    try {
      const event = stripe.webhooks.constructEvent(
        request.rawBody,
        sig,
        webhookSecret
      );

      // console.log('Raw Request Body:', request.rawBody.toString());

      // Handle the verified event
      switch (event.type) {
        case 'payment_intent.succeeded':
          // Extract relevant data from the event
          const paymentIntent = event.data.object;

          // Extract the order ID from metadata
          const orderId = paymentIntent.metadata.order_id;
          const orderValue = parseFloat(
            (paymentIntent.amount_received / 100).toFixed(2)
          );

          // Generate the order reference using the orderRef module
          const { newInvNum, invRef } = await generateOrderReference();
          // Retrieve customer, billing address, and delivery address information using orderId
          let billInfo = await getBillInfo(orderId);
          let customer = await getCustomer(orderId);
          let billAdd = await getBillingAddress(orderId);
          let delAdd = await getDeliveryAddress(orderId);
          // create Invoice Document
          let invoiceData = {};
          invoiceData.invoiceNumber = newInvNum;
          invoiceData.invRef = invRef;
          invoiceData.date = Date();
          invoiceData.basketId = orderId;
          invoiceData.delCost = billInfo.delCost;
          invoiceData.delMethod = billInfo.delMethod;
          invoiceData.itemQty = billInfo.itemsQty;
          invoiceData.cartValue = billInfo.billValue;

          const invoiceId = await createInvoice(invoiceData);
          console.log('New invoice document created with ID:', invoiceId);

          // Create or Update customer document in Firestore to include
          customer.invoices = [newInvNum];
          customer.baskets = [orderId];

          const customerId = await createOrUpdateCustomer(customer);
          console.log('New customer document created with ID:', customerId);

          // create a delivery address document
          delAdd.invoice = newInvNum;
          delAdd.customerId = customerId;
          delAdd.orderId = orderId;
          const deliveryId = await createDeliveryDoc(delAdd);
          console.log('New delivery document created with ID:', deliveryId);

          // create a billing address document
          billAdd.invoice = newInvNum;
          billAdd.customerId = customerId;
          billAdd.orderId = orderId;
          const billingId = await createBillingDoc(billAdd);
          console.log('New billing document created with ID:', billingId);

          // update Invoice with value customerId, billingId and deliveryId, status
          // update Customer with billingId and deliveryId, status
          invoiceData.customerID = customerId;
          invoiceData.billingId = billingId;
          invoiceData.deliveryId = deliveryId;
          invoiceData.customerID = customerId;
          invoiceData.value = orderValue;
          invoiceData.status = 'paid';

          customer.billingId = billingId;
          customer.deliveryId = deliveryId;
          const finalData = await finalUpdate(
            customerId,
            invoiceId,
            customer,
            invoiceData
          );

          // Update the corresponding order in Firebase
          try {
            // Update the corresponding order in Firestore
            await admin.firestore().collection('orders').doc(orderId).update({
              'billInfo.paymentStatus': 'paid',
            });
            console.log('Order marked as paid:', orderId);
          } catch (error) {
            console.error('Error updating billInfo:', error);
          }
          // Create and save a PDF Invoice
          try {
            await generateWebpageSaveStoragePDF();
            console.log('Successfully Created PDF Inv:', orderId);
          } catch (error) {
            console.error('Error creating PDF Invoice:', error);
          }

          console.log('Payment Intent Succeeded:', paymentIntent.id);

          // create invoice with data
          // save created invoice as PDF to storage
          // send confirmation email with created PDF invoice
          const emailTemplate = '';
          sendEmail(orderId, emailTemplate);

          break;
        // Add cases for other types of Stripe events as needed

        default:
          console.log('Unhandled event type:', event.type);
      }
      return response.status(200).send('all ok');
    } catch (err) {
      console.error('Error verifying Stripe webhook:', err.message);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
);
