/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');

// These are the functions that can be called with the firebaeAPI

// Import the sendEmail function
const sendEmail = require('./sendEmail.js');
// Export the sendEmail function
exports.sendEmail = sendEmail;

// Import the sendEmail with Attachment function
// const sendEmailwithAttachment = require('./sendEmailwithAttachment.js');
// Export the sendEmail function
// exports.sendEmailwithAttachment = sendEmailwithAttachment;

// Import the sendEmail function
const stripe = require('./stripe.js');

// Export the sendEmail function
// Called when payment is successful, creates and sends PDF invoice to cutomer on confirmation email
exports.stripe = stripe;

// Import the createInvoice function
// const createInvoicePDF = require('./createInvoicePDF.js');

// Export the sendEmail function
// exports.createInvoicePDF = createInvoicePDF;
