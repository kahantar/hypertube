let nodemailer = require('nodemailer');

const messagerie = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lotre.matcha@gmail.com',
    pass: "27092709",
  },
});

const mailer = (message, adress, sujet) => {
  const user = {
    to: adress,
    subject: sujet,
    text: message,
  };
  messagerie.sendMail(user);
  messagerie.close();
};
module.exports = mailer