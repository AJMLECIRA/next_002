// stripeSignature.test.js

const generateStripeSignature = require('./stripeSignature');

// Test cases for generateStripeSignature function
describe('generateStripeSignature function', () => {
  // Test case: Verify signature generation
  test('should generate a valid Stripe signature', () => {
    // Mock payload and secret
    const payload = { example: 'payload' };
    const secret = 'your_stripe_webhook_secret';

    // Generate signature
    const signature = generateStripeSignature(payload, secret);

    // Assert signature format
    expect(signature).toMatch(/^\d+\.[0-9a-f]{64}$/);
  });

  // Add more test cases as needed to cover different scenarios
});
