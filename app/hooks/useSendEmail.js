import { useState } from 'react';

const useSendEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // 1. State to keep track of the email sending status (e.g., idle, sending, sent, error).
  const [status, setStatus] = useState('idle');

  const sendEmail = async ({ dynamic, ref, values }) => {
    console.log('useSendEmail', dynamic, ref, values);
    setLoading(true);
    setError(null);
    setStatus('working');

    // Here, we will integrate the logic to send the email.
    try {
      // Here's where you'd call your actual email sending function.
      if (!dynamic) {
        console.log('dynamic email false triggered');
        const emailInfoToSend = {
          to: values.email,
          from: 'support@mirrorworld.co.uk', // Must be a registered email with sendGrid
          templateId: ref,
          orderRefShort: values.orderRefShort,
          att: true,
          attName: values.attName,
        };
        console.log('emailInfoToSend', emailInfoToSend);
        // Call the Firebase Cloud Function
        const response = await fetch(
          'https://us-central1-mw-project-react-2023.cloudfunctions.net/sendEmail-processEmail', // LIVE
          //LOCAL "http://localhost:5001/mw-project-react-2023/us-central1/sendEmail-processEmail",//LOCAL
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailInfoToSend),
          }
        );

        if (!response.ok) {
          throw new Error('Error triggering email function');
        }

        // const responseData = await response.json();
        // console.log("Email function triggered successfully:", responseData);
      } else {
        // Handle the logic for dynamic SendGrid templates
        // ...
      }

      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setLoading(false);
      setError(err);
      setSuccess(false);
    }
  };

  return { sendEmail, status, loading, error, success };
};

// This is a mock function for demonstration purposes.
const sendEmailAPI = async (emailData) => {
  // Here, you'd have your logic to send the email via SendGrid or any other service.
  // For this mock function, we'll just simulate a delay.
  return new Promise((resolve) => setTimeout(resolve, 2000));
};

export { useSendEmail };
