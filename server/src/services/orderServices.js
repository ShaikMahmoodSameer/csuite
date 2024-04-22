const createpoolConnection = require("../../config/database");
const { handleErrorLog } = require("../utils/handleError");
const pool = createpoolConnection();

const placeOrder = async (orderData, callback) => {
    try {
        const { userId, memberDetails, amount, payment } = orderData.checkOutFormData;
        const { name, email, company, designation, purpose } = memberDetails;
        const { rzp_order_id, rzp_payment_id, rzp_signature } = payment;
        const { subTotalAmount, couponCode, couponCodeDiscount, totalAmount } = amount;

        // console.log(userId, memberDetails, amount, payment, name, email, company, designation, purpose, rzp_order_id, rzp_payment_id, rzp_signature, subTotalAmount, couponCode, couponCodeDiscount, totalAmount);

        pool.query('INSERT INTO orders (user_id) VALUES (?)', [userId], (uidInsErr, uidInsRes) => {
            if (uidInsErr) {
                handleErrorLog("Err in placing order at orders table")
            } else {
                const orderId = uidInsRes.insertId;
                pool.query(
                    'INSERT INTO order_benificiary (bnf_name, email, company, designation, purpose, user_id) VALUES (?,?,?,?,?,?)',
                    [name, email, company, designation, purpose, userId],
                    (memInsErr, memInsRes) => {
                        if (memInsErr) { handleErrorLog("Err in inserting benificairy details", memInsErr) }
                        const bnfId = memInsRes.insertId;

                        pool.query(
                            'INSERT INTO order_payments (rzp_order_id, rzp_payment_id, rzp_signature, order_id) VALUES (?,?,?,?)',
                            [rzp_order_id, rzp_payment_id, rzp_signature, orderId],
                            (pmtInsErr, pmtInsRes) => {
                                if (pmtInsErr) { handleErrorLog("Err in inserting order payment details", pmtInsErr) }
                                const paymentId = pmtInsRes.insertId;

                                pool.query(
                                    'INSERT INTO order_billing (order_id, user_id, order_subtotal_amount, order_coupon_code_applied, order_coupon_code_discount, order_discount_amount, order_total_amount, payment_id) VALUES (?,?,?,?,?,?,?,?)',
                                    [orderId, userId, subTotalAmount, couponCode, couponCodeDiscount, couponCodeDiscount, totalAmount, paymentId],
                                    (blgInsErr, blgInsRes) => {
                                        if (blgInsErr) { handleErrorLog("Err in inserting order billing details", blgInsErr) }
                                        const billingId = blgInsRes.insertId;

                                        pool.query(
                                            'INSERT INTO tickets (user_id, order_id, bnf_id, payment_id, order_billing_id) VALUES (?,?,?,?,?)',
                                            [userId, orderId, bnfId, paymentId, billingId],
                                            (tktInsErr, tktInsRes) => {
                                                if (tktInsErr) { handleErrorLog("Err in inserting order ticket details", tktInsErr) }

                                                const ticketId = tktInsRes.insertId;
                                                console.log(`user UserId: ${userId} placed order!, ticketId: ${ticketId}`);
                                                callback(null, ticketId)
                                            }
                                        )
                                    }
                                )

                            }
                        )
                    }
                )
            }
        })
    } catch (error) {
        console.error("Error placing order:", error);
        throw { success: false, error };
    }
};

module.exports = {
    placeOrder
};