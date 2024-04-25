const createpoolConnection = require("../../../config/database");
const pool = createpoolConnection();

const getMeetingTbls = (callback) => {
    pool.query('SELECT * FROM meeting_tables', (error, response) => {
        callback(error, response);
    })
}

const addMtngTbl = (newMtngTblData, callback) => {
    const { tableName, tableNo, roomNo } = newMtngTblData;
    pool.query(
        'INSERT INTO meeting_tables (tbl_name, tbl_no, tbl_room) VALUES (?,?,?)',
        [tableName, tableNo, roomNo],
        (error, response) => {
            callback(error, response);
        })
}

const getMtngTblSessGuests = (tblSess, callback) => {
    const { tblNo, session } = tblSess;
    pool.query(
        'SELECT mtg.*, ob.* FROM meeting_table_guests mtg JOIN order_benificiary ob ON mtg.guest_id = ob.bnf_id WHERE mtg.tbl_no = ? AND mtg.m_tbl_session = ?',
        [tblNo, session],
        (error, response) => {
            callback(error, response);
        }
    );
}

const addGuestsToMtngTbl = (newGuestsData, callback) => {
    const { selectedGuests, tableNumberId, tableNumber, session } = newGuestsData;
    const insertPromises = selectedGuests.map((guest, index) => {
        const { bnf_id } = guest;
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO meeting_table_guests (guest_id, m_tbl_id, tbl_no, m_tbl_session) VALUES (?,?,?,?)',
                [bnf_id, tableNumberId, tableNumber, session],
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
}

const getMeetinGuestInfo = (insertId) => {
    return new Promise((resolve, reject) => {
        const q = 'SELECT mtg.*, bnf.bnf_name, bnf.company, bnf.designation, u.mobile_number, tbl.tbl_name, tbl.tbl_room, t.ticket_number FROM meeting_table_guests mtg JOIN order_benificiary bnf ON mtg.guest_id = bnf.bnf_id JOIN users u ON bnf.user_id = u.user_id JOIN meeting_tables tbl ON mtg.m_tbl_id = tbl.tbl_id JOIN tickets t ON bnf.bnf_id = t.bnf_id WHERE mtg.mtg_id = ?';
        pool.query(q, [insertId],
        (err, res) => {
            if (err) { reject(err) } else { resolve(res) }
        });
    });
};

// const getMeetinGuestInfo = (insertIds) => {
//     const promises = insertIds.map(insertId => {
//         return new Promise((resolve, reject) => {
//             const q = 'SELECT mtg.*, bnf.bnf_name, bnf.company, bnf.designation, u.mobile_number, tbl.tbl_name, tbl.tbl_room, t.ticket_number FROM meeting_table_guests mtg JOIN order_benificiary bnf ON mtg.guest_id = bnf.bnf_id JOIN users u ON bnf.user_id = u.user_id JOIN meeting_tables tbl ON mtg.m_tbl_id = tbl.tbl_id JOIN tickets t ON bnf.bnf_id = t.bnf_id WHERE mtg.mtg_id = ?';
//             pool.query(q, [insertId], (err, res) => {
//                 if (err) { reject(err) } else { resolve(res) }
//             });
//         });
//     });

//     return Promise.all(promises);
// };


module.exports = {
    getMeetingTbls,
    addMtngTbl,
    getMtngTblSessGuests,
    addGuestsToMtngTbl,
    getMeetinGuestInfo
}