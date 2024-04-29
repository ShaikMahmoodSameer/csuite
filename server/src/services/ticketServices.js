const createpoolConnection = require("../../config/database");
const pool = createpoolConnection();

const getAllTickets = (callback) => {
    pool.query("SELECT * FROM tickets", (error, response) => {
        callback(error, response);
    });
}

const getTicketPrice = (callback) => {
    pool.query("SELECT * FROM properties WHERE property = 'ticket_price'", (error, response) => {
        callback(error, response);
    });
}

const SetNewPrice = (newPrice, callback) => {
    pool.query(`UPDATE properties SET value = ${newPrice} WHERE property = 'ticket_price'`, (error, response) => {
        callback(error, response);
    });
}

const fetchTicketData = (ticketId, callback) => {
    const query = `SELECT tickets.ticket_id, tickets.ticket_number, users.mobile_number, orders.order_time, order_benificiary.bnf_name, order_benificiary.email, order_benificiary.company, order_benificiary.designation, order_benificiary.purpose, order_payments.rzp_order_id, order_payments.rzp_payment_id, order_payments.rzp_signature, order_billing.order_subtotal_amount, order_billing.order_coupon_code_applied, order_billing.order_coupon_code_discount, order_billing.order_discount_amount, order_billing.order_total_amount FROM tickets LEFT JOIN users ON tickets.user_id = users.user_id LEFT JOIN orders ON tickets.order_id = orders.order_id LEFT JOIN order_benificiary ON tickets.bnf_id = order_benificiary.bnf_id LEFT JOIN order_payments ON tickets.payment_id = order_payments.payment_id LEFT JOIN order_billing ON tickets.order_billing_id = order_billing.order_billing_id WHERE tickets.ticket_id = ${ticketId}`;
    pool.query(query, (error, response) => {
        callback(error, response);
    })
}

const getTktInfo = (ticketId, callback) => {
    pool.query("SELECT * FROM tickets WHERE ticket_id = ?", [ticketId], (error, response) => {
        callback(error, response);
    });
}

const getBenificairyDetails = (bnfId, callback) => {
    pool.query(
        "SELECT ob.*, u.mobile_number FROM order_benificiary ob LEFT JOIN users u ON ob.user_id = u.user_id WHERE ob.bnf_id = ?",
        [bnfId],
        (error, response) => {
            callback(error, response);
        }
    );
};

const getBillingDetails = (billingId, callback) => {
    pool.query(
        "SELECT * FROM order_billing WHERE order_billing_id = ?",
        [billingId],
        (error, response) => {
            callback(error, response);
        }
    );
};

const getPaymentDetails = (paymentId, callback) => {
    pool.query(
        "SELECT * FROM order_payments WHERE payment_id = ?",
        [paymentId],
        (error, response) => {
            callback(error, response);
        }
    );
};


module.exports = {
    getAllTickets,
    getTicketPrice,
    SetNewPrice,
    getTktInfo,
    getBenificairyDetails,
    getBillingDetails,
    getPaymentDetails,
    fetchTicketData
};