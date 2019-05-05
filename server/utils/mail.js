const keys = require("../config/keys");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(keys.SENDGRID);

module.exports = {
  send: async (email, subject, body, path, token, req) => {
    const msg = {
      to: email,
      from: "theater@no-reply.com",
      templateId: "d-d3c6bd2e713245b796afbd2ed1be4840",
      dynamic_template_data: {
        subject,
        body,
        url: `${req.get("origin")}/${path}?token=${token}`
      }
    };

    await sgMail.send(msg);
  }
};
