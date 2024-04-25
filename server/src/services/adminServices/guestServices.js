const createpoolConnection = require("../../../config/database");
const pool = createpoolConnection();

const getAllGuests = (callback) => {
    pool.query('SELECT * FROM order_benificiary', (error, response) => {
        callback(error, response);
    })
}

const getUnseatedGuests = (callback) => {
    pool.query('SELECT * FROM order_benificiary LEFT JOIN seating_table_guests ON order_benificiary.bnf_id = seating_table_guests.guest_id LEFT JOIN seating_sofa_guests ON order_benificiary.bnf_id = seating_sofa_guests.guest_id WHERE seating_table_guests.guest_id IS NULL AND seating_sofa_guests.guest_id IS NULL;',
    (error, response) => {
        callback(error, response);
    })
}

module.exports = {
    getAllGuests,
    getUnseatedGuests
}