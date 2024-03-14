const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

// Replace the payload with your webhook event object
const payload = {
  id: 'evt_3OjiHAFPheH9jGKr0gAuL15s',
  object: 'event',
  api_version: '2023-10-16',
  created: 1707916428,
  data: {
    object: {
      id: 'pi_3OjiHAFPheH9jGKr03bBpZR4',
      object: 'payment_intent',
      amount: 18454,
      amount_capturable: 0,
      amount_details: {
        tip: {},
      },
      amount_received: 18454,
      application: null,
      application_fee_amount: null,
      automatic_payment_methods: {
        allow_redirects: 'always',
        enabled: true,
      },
      canceled_at: null,
      cancellation_reason: null,
      capture_method: 'automatic',
      client_secret:
        'pi_3OjiHAFPheH9jGKr03bBpZR4_secret_dyRW1P3191ZenroaB3zh9I1CD',
      confirmation_method: 'automatic',
      created: 1707916404,
      currency: 'gbp',
      customer: null,
      description: null,
      invoice: null,
      last_payment_error: null,
      latest_charge: 'ch_3OjiHAFPheH9jGKr03I8vYmn',
      livemode: false,
      metadata: {
        order_id: '2402e08d-1cc9-44e1-bec6-77fe5be3f029',
      },
      next_action: null,
      on_behalf_of: null,
      payment_method: 'pm_1OjiHXFPheH9jGKrIdxmuiUO',
      payment_method_configuration_details: {
        id: 'pmc_1Of54ZFPheH9jGKrVHPiIsje',
        parent: null,
      },
      payment_method_options: {
        card: {
          installments: null,
          mandate_options: null,
          network: null,
          request_three_d_secure: 'automatic',
        },
        klarna: {
          preferred_locale: null,
        },
        paypal: {
          preferred_locale: null,
          reference: null,
        },
      },
      payment_method_types: ['card', 'klarna', 'paypal'],
      processing: null,
      receipt_email: null,
      review: null,
      setup_future_usage: null,
      shipping: null,
      source: null,
      statement_descriptor: null,
      statement_descriptor_suffix: null,
      status: 'succeeded',
      transfer_data: null,
      transfer_group: null,
    },
  },
  livemode: false,
  pending_webhooks: 2,
  request: {
    id: 'req_kaZomaSHyuVlBM',
    idempotency_key: 'bedd4ffb-f69e-4c6b-9f68-872df3eb0787',
  },
  type: 'payment_intent.succeeded',
};

const secret = process.env.STRIPE_WEBHOOK_SECRET; // Your webhook secret
console.log('Stripe Webhook Secret:', process.env.STRIPE_WEBHOOK_SECRET);
const signature = stripe.webhooks.generateTestHeaderString({
  payload: JSON.stringify(payload),
  secret,
});

console.log('stripe-signature:', signature);
