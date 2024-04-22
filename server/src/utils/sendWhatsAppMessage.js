const axios = require('axios');

require('dotenv').config();
const phoneId = process.env.WTSP_PHONE_NUMBER_ID;
const templateName = process.env.WTSP_TEMP_NAME;
const accessTokenKey = process.env.WTSP_PERM_ACCESS_TOKEN_KEY;

async function sendWhatsAppMessageOrderPlaced(ticketData, callback) {
  const {userMobileNumber, ticketQrImageLink, ticketNumber, name, orderDate, email} = ticketData;

  const data = {
    messaging_product: 'whatsapp',
    to: `91${userMobileNumber}`,
    // to: `919948561004`, //amarnath phone number
    type: 'template',
    template: {
      name: templateName,
      language: { code: 'en_US' },
      components: [
        {
          type: 'header',
          parameters: [
            {
              type: 'image',
              image: {
                link: ticketQrImageLink,
              },
            },
          ],
        },
        {
          type: 'body',
          parameters: [
            { type: 'text', text: ticketNumber },
            { type: 'text', text: name },
            {
              type: 'date_time',
              date_time: {
                fallback_value: orderDate,
              },
            },
            { type: 'text', text: email },
          ],
        },
      ],
    },
  };

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${phoneId}/messages`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessTokenKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (response) {
      callback(null, { Status: "Success", Message: "Message sent successfully!" })
    }
  } catch (error) {
    // console.error(error.response.data);
  }
}
  
module.exports = {
  sendWhatsAppMessageOrderPlaced
}