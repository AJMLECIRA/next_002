import express from 'express';

const app = express();
const port = 3000; // Choose the port you want to use

// Parse JSON body using built-in middleware
app.use(express.json());

// Define a route to handle incoming PayPal webhook notifications
app.post('/paypal-webhook', (req, res) => {
  // Process the webhook notification here
  const webhookEvent = req.body;
  console.log('Received PayPal webhook:', webhookEvent);

  // Handle the event and update your database or perform actions
  if (webhookEvent.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
    const invoiceID = webhookEvent.resource.invoice_id;
    console.log(`Payment for invoice ID ${invoiceID} was successful.`);
    // Update your database or perform other actions related to the successful payment
  } else {
    console.log('Unhandled PayPal webhook event:', webhookEvent.event_type);
  }

  // Respond with a success status to acknowledge receipt of the webhook
  res.status(200).send('PayPal webhook received successfully');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
