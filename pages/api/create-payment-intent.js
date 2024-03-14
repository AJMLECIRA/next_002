// This is your test secret API key.

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  const basketValue = Math.round(items[0].amount * 100);
  //console.log('basketValue', basketValue);

  return basketValue;
};

export default async function handler(req, res) {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'gbp',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    metadata: {
      order_id: items[0].id,
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
