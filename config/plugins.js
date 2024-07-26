module.exports = ({ env }) => ({
    email: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('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'),
      },
      settings: {
        defaultFrom: 'siddhant.kumar@bahwancybertek.com',
        defaultReplyTo: 'your-email@example.com',
      },
    },
  });
  