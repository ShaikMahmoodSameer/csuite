const axios = require('axios');

require('dotenv').config();
const phoneId = process.env.WTSP_PHONE_NUMBER_ID;
const accessTokenKey = process.env.WTSP_PERM_ACCESS_TOKEN_KEY;

async function sendWtspMeetingTblAssigned(msgData) {
  const { userMobileNumber, ticketQrImageLink, ticketNumber, name, otherMembers, tblRoom, tableNo, session } = msgData;

  const data = {
    messaging_product: 'whatsapp',
    to: `91${userMobileNumber}`,
    type: 'template',
    template: {
      name: 'meeting_table_booking',
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
            { type: 'text', text: otherMembers },
            { type: 'text', text: tblRoom },
            { type: 'text', text: tableNo },
            { type: 'text', text: session }
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
    // console.log("Message sent successfully!");
    return { Status: "Success", Message: "Message sent successfully!" };
  } catch (error) {
    console.error("Error sending message:", error);
    return { Status: "Error", Message: "Error sending message" };
  }
}

module.exports = {
  sendWtspMeetingTblAssigned
}

  
module.exports = {
  sendWtspMeetingTblAssigned
}