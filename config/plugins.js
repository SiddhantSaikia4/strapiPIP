module.exports = ({ env }) => ({
    email: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env(''),
      },
      settings: {
        defaultFrom: 'siddhant.kumar@bahwancybertek.com',
        defaultReplyTo: 'your-email@example.com',
      },
    },
  });
  