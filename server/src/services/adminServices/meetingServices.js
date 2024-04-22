const createpoolConnection = require("../../../config/database");
const pool = createpoolConnection();

const getMeetingTbls = (callback) => {
    pool.query('SELECT * FROM meeting_tables', (error, response) => {
        callback(error, response);
    })
}
const addMtngTbl = (newSeatingTable, callback) => {
    const { tableName, tableNo, roomNo } = newSeatingTable;
    pool.query(
        'INSERT INTO meeting_tables (tbl_name, tbl_no, tbl_room) VALUES (?,?,?)',
        [tableName, tableNo, roomNo],
        (error, response) => {
            callback(error, response);
        })
}

const getMtngGuests = (tableNumber, callback) => {
    pool.query(
        // `SELECT * FROM meeting_table_guests WHERE m_tbl_id = ${tableNumber}`,
        `SELECT * FROM meeting_table_guests MTG JOIN order_benificiary OB ON MTG.guest_id = OB.bnf_id WHERE MTG.mtg_id = ${tableNumber}`,
        (error, response) => {
            callback(error, response);
        })
}

const addGuestsToMeetingTable = (reqData, callback) => {
    const { selectedGuests, tableNumber, session } = reqData;

    const insertPromises = selectedGuests.map((guest, index) => {
        const { bnf_id } = guest;
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO meeting_table_guests (guest_id, m_tbl_id, m_tbl_session) VALUES (?,?,?)`,
                [bnf_id, tableNumber, session],
                (error, response) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(response);
                    }
                }
            );
        });
    });

    Promise.all(insertPromises)
        .then(responses => callback(null, responses))
        .catch(error => callback(error, null));
};

module.exports = {
    getMeetingTbls,
    addMtngTbl,
    getMtngGuests,
    addGuestsToMeetingTable
}