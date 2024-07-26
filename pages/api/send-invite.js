// pages/api/send-invite.js

import sgMail from '@sendgrid/mail';
import https from 'https';

// Bypass SSL verification (development only)
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const msg = {
      to: email,
      from: 'siddhantsaikia@gmail.com',
      subject: 'You are invited to join my Strapi PIP program',
      text: 'Please sign up using the link below: http://localhost:3000/',
      html: '<strong>Please sign up using the link below:</strong><br><a href="http://localhost:3000/">Sign Up Here</a>',
    };

    try {
      await sgMail.send(msg);
      res.status(200).json({ message: 'Invitation sent successfully!' });
    } catch (error) {
      console.error('SendGrid error:', error); 
      res.status(500).json({ error: 'Failed to send invitation', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
