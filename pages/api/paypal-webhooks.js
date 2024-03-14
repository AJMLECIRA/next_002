// pages/api/paypal-webhook.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle the webhook event
    const event = req.body;

    // Validate the event with PayPal (important for security)
    // Implement validation logic here

    // Process the event based on its type (e.g., payment completion)
    if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
      // Payment is successful, update your backend accordingly
      // Implement your logic here
    }

    res.status(200).json({ message: 'Webhook received and processed' });
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
