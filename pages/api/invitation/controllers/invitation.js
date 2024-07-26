'use strict';

module.exports = {
  async sendInvite(ctx) {
    const { email } = ctx.request.body;

    if (!email) {
      return ctx.badRequest('Email address is required');
    }

    try {
      await strapi.plugins['email'].services.email.send({
        to: email,
        from: 'siddhant.kumar@bahwancybertek.com',
        subject: 'Invitation to Sign Up',
        text: 'You are invited to sign up.',
        html: '<p>You are invited to sign up.</p>',
      });

      return ctx.send({ message: 'Invitation sent successfully' });
    } catch (error) {
      return ctx.badRequest('Failed to send invitation');
    }
  },
};
