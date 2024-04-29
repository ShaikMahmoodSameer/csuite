const axios = require('axios');

require('dotenv').config();
const phoneId = process.env.WTSP_PHONE_NUMBER_ID;
const accessTokenKey = process.env.WTSP_PERM_ACCESS_TOKEN_KEY;

async function sendWtspSeatingTblAssigned(msgData) {
  const {userMobileNumber, ticketQrImageLink, ticketNumber, name, tableNo, seatNo, fullSeat} = msgData;  

  const data = {
    messaging_product: 'whatsapp',
    to: `91${userMobileNumber}`,
    type: 'template',
    template: {
      name: 'seating_table_booking',
      language: { code: 'en_US' },
      components: [
        {
          type: 'header',
          parameters: [
            { type: 'image', image: { link: ticketQrImageLink } },
          ],
        },
        {
          type: 'body',
          parameters: [
            { type: 'text', text: name },
            { type: 'text', text: fullSeat },
            { type: 'text', text: tableNo },
            { type: 'text', text: seatNo }
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
    // if (response) {
    //   callback(null, { Status: "Success", Message: "Message sent successfully!" })
    // }
  } catch (error) {
    console.error(error);
  }
}
  
module.exports = {
    sendWtspSeatingTblAssigned
}