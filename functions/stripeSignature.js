// functions/stripeSignature.js

const crypto = require('crypto');

/**
 * Generate Stripe signature for webhook events.
 * @param {object} payload - The payload of the webhook event.
 * @param {string} secret - The webhook signing secret provided by Stripe.
 * @returns {string} The generated Stripe signature.
 */
function generateStripeSignature(payload, secret) {
  const timestamp = Date.now().toString();
  const signedPayload = timestamp + '.' + JSON.stringify(payload);
  const signature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');
  return `${timestamp}.${signature}`;
}

module.exports = generateStripeSignature;
