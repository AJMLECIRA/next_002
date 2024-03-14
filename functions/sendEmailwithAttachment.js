// #############################################
// #############      NOT USED      ############
// #############################################

const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const sgMail = require('@sendgrid/mail');

// Connect to cloud storage for attaching files
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

// Sets sendGridApiKey Key with a valid key
const sendGridApiKey =
  process.env.SENDGRID_API_KEY ||
  (functions.config().sendgrid && functions.config().sendgrid.key);
if (!sendGridApiKey || !sendGridApiKey.startsWith('SG.')) {
  console.error('Valid SendGrid API key not found!');
} else {
  sgMail.setApiKey(sendGridApiKey);
}

// Define the function to fetch a document from Google Cloud Storage
async function fetchDocumentStream(fileName) {
  const bucket = storage.bucket('mw-project-react-2023.appspot.com');
  const file = bucket.file(fileName);

  // Downloads the file into a buffer.
  const [buffer] = await file.download();
  // Convert the file buffer to a base64 encoded string
  const base64EncodedString = buffer.toString('base64');
  return base64EncodedString;
}

exports.sendEmailwithAttachment = functions.https.onRequest(
  (request, response) => {
    // Enable CORS to allow requests from different origins, and handle the incoming request asynchronously
    cors(request, response, async () => {
      // Check if the request object is defined
      if (!request) {
        console.error('Request object is undefined.');
        // Send a 500 Internal Server Error response if the request object is not defined
        response.status(500).send({
          error: 'Internal server error. Request object is undefined.',
        });
        return;
      }
      // Check if the incoming request is a POST request
      if (request.method !== 'POST') {
        console.log('Sending 405 Method Not Allowed.');
        // Send a 405 Method Not Allowed response if the request is not a POST request
        response.status(405).send('Method Not Allowed');
        return;
      }

      // Construct the email object from the incoming request's body
      let email = {
        to: request.body.to, // Recipient of the email
        from: request.body.from, // Sender of the email
        templateId: request.body.templateId, // ID of the email template to use
        dynamic_template_data: {
          orderRefShort: request.body.orderRefShort,
        },
      };
      // Check for file attachment requirement and add data to email object
      const attName = request.body.attName;
      if (attName) {
        try {
          const base64EncodedString = await fetchDocumentStream(attName);
          const attachment = {
            content: base64EncodedString,
            filename: attName,
            type: 'application/pdf',
            disposition: 'attachment',
            content_id: 'documentAttachment',
          };

          // Add the attachment to the email object
          email.attachments = [attachment];
        } catch (error) {
          console.error('Error fetching document:', error);
          response.status(500).send({ error: 'Failed to fetch attachment.' });
          return;
        }
      }

      try {
        // Try to send the email using SendGrid
        await sgMail.send(email);
        console.log('Sending 200 OK.');
        // Send a 200 OK response if the email is sent successfully
        response.status(200).send({ message: 'Email sent successfully!' });
      } catch (error) {
        // Log any errors that occur while sending the email through SendGrid
        console.error('SendGrid Error:', error);
        console.log('Sending 500 Internal Server Error.');
        // Send a 500 Internal Server Error response if the email fails to send
        response.status(500).send({ error: 'Failed to send the email.' });
      }
    });
  }
);
