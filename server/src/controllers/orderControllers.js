const ordersServices = require("..//services/orderServices");
const ticketServices = require("..//services/ticketServices");
const { formatTime } = require("../utils/formatTime");
const { handleErrorLog } = require("../utils/handleError");
const { sendWhatsAppMessageOrderPlaced } = require("../utils/sendWhatsAppMessage");

const placeOrder = async (req, res) => {
    const orderData = req.body;

    ordersServices.placeOrder(orderData, (error, response) => {
        if(error){
            console.log(error);
            console.error('Internal Server Error(Placing Order):', error);
            res.status(500).json({ Status: "Failed" });
        } else if (response) {
            // mailServices.sendOrderPlacedMail(response, orderData);
            const ticketId = response;

            // fetching Ticket Details for Order Placed WhatsApp message
            ticketServices.fetchTicketData(ticketId, (errTktDetails, ticketDetails) => {
                if (errTktDetails) { handleErrorLog("Error at fetching ticket details for sending wtsp order placed message", errTktDetails) }

                if (ticketDetails) {
                    sendWhatsAppMessageOrderPlaced(
                        {
                            userMobileNumber: ticketDetails.mobile_number,
                            ticketQrImageLink: "https://nutrifycsuite.com/images/scanner_img.jpg",
                            ticketNumber: ticketDetails.ticket_number,
                            name: ticketDetails.bnf_name,
                            orderDate: formatTime(ticketDetails.order_time),
                            email: ticketDetails.email
                        }, 
                        (wtMsgError, wtMsgRes) => {
                            if (wtMsgError) { handleErrorLog("Error at sending wtsp message on order placed", wtMsgError) }
        
                            if(wtMsgRes.Status === "Success") {
                                res.status(200).json({ Status: "Success", ticketId: ticketId });
                            }
                        }
                    )
                }
            })

        }
    })
};

module.exports = {
    placeOrder,
};
