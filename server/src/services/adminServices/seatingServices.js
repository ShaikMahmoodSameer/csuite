const createpoolConnection = require("../../../config/database");
const pool = createpoolConnection();

const getSeatingTables = (callback) => {
    pool.query('SELECT * FROM seating_tables', (error, response) => {
        callback(error, response);
    })
}
const addSeatingTable = (newSeatingTable, callback) => {
    pool.query(
        'INSERT INTO seating_tables (seating_table_no, no_of_seats) VALUES (?,?)', 
        [newSeatingTable.tableNumber, newSeatingTable.noOfSeats], 
        (error, response) => {
        callback(error, response);
    })
}
const getTableGuests = (newSeatingTable, callback) => {
    pool.query(
        `SELECT * FROM seating_table_guests STG JOIN order_benificiary OB ON STG.guest_id = OB.bnf_id WHERE STG.seating_table_id = ${newSeatingTable} ORDER BY STG.seat_no ASC;`, 
        (error, response) => {
        callback(error, response);
    })
}
const addGuestsToSeatingTable = (reqData, callback) => {
    const {selectedGuests, tableNumber} = reqData;
    pool.query('SELECT COUNT(*) AS num_rows FROM seating_table_guests WHERE seating_table_id = ?', [tableNumber], (error, response) => {
        if (error) {
            console.log(error);
            callback(error, null);
        } else {
            const noOfGuestPresentInTable = response[0].num_rows;
            const insertPromises = selectedGuests.map((guest, index) => {
                const { bnf_id } = guest;
                const seatNumber = `ST${tableNumber}S${noOfGuestPresentInTable+index+1}`
                return new Promise((resolve, reject) => {
                    pool.query(
                        'INSERT INTO seating_table_guests (guest_id, seating_table_id, seat, seat_no) VALUES (?,?,?,?)',
                        [bnf_id, tableNumber, seatNumber, noOfGuestPresentInTable+index+1],
                        (error, response) => {
                            if (error) { reject(error); } else { resolve(response); }
                        }
                    );
                });
            });
        
            Promise.all(insertPromises)
                .then((responses) => {
                    callback(null, responses)
                }).catch(error => callback(error, null));
        }
    });
};

const getTblGuestInfo = (insertId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT stg.seating_table_id, stg.seat, stg.seat_no, ob.bnf_name, ob.user_id, u.mobile_number, t.ticket_number FROM seating_table_guests stg JOIN order_benificiary ob ON stg.guest_id = ob.bnf_id JOIN users u ON ob.user_id = u.user_id JOIN tickets t ON u.user_id = t.user_id WHERE stg.id = ?', [insertId], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};


const getSeatingSofas = (callback) => {
    pool.query('SELECT * FROM seating_sofas', (error, response) => {
        callback(error, response);
    })
}
const addSeatingSofa = (newSeatingSofa, callback) => {
    pool.query(
        'INSERT INTO seating_sofas (seating_sofa_no, sofa_no, no_of_seats) VALUES (?,?,?)', 
        [newSeatingSofa.sofaNumber, newSeatingSofa.sofa_no, newSeatingSofa.noOfSeats], 
        (error, response) => {
        callback(error, response);
    })
}
const getSofaGuests = (newSeatingSofa, callback) => {
    pool.query(
        `SELECT * FROM seating_sofa_guests SSG JOIN order_benificiary OB ON SSG.guest_id = OB.bnf_id WHERE SSG.seating_sofa_id = ${newSeatingSofa} ORDER BY SSG.seat_no ASC;`, 
        (error, response) => {
        callback(error, response);
    })
}
const addGuestsToSeatingSofa = (reqData, callback) => {
    const {selectedGuests, sofaNumber, sofaId} = reqData;
    pool.query(`SELECT COUNT(*) AS num_rows FROM seating_sofa_guests WHERE seating_sofa_id = ${sofaNumber}`, 
        (error, response) => {
            if (error) {console.log(error);}
            else {
                const noOfGuestPresentInSofa = response[0].num_rows;
                const insertPromises = selectedGuests.map((guest, index) => {
                    const { bnf_id } = guest;
                    const seatNumber = `SS${sofaNumber}S${noOfGuestPresentInSofa+index+1}`
                    return new Promise((resolve, reject) => {
                        pool.query(
                            `INSERT INTO seating_sofa_guests (guest_id, seating_sofa_id, seat, seat_no) VALUES (?,?,?,?)`,
                            [bnf_id, sofaId, seatNumber, index+1],
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
        }
    )
};
const getSofaGuestInfo = (insertId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT sfg.seating_sofa_id, sfg.seat, sfg.seat_no, ss.seating_sofa_no, ss.sofa_no, ob.bnf_name, ob.user_id, u.mobile_number, t.ticket_number FROM seating_sofa_guests sfg JOIN order_benificiary ob ON sfg.guest_id = ob.bnf_id JOIN users u ON ob.user_id = u.user_id JOIN tickets t ON u.user_id = t.user_id JOIN seating_sofas ss ON sfg.seating_sofa_id = ss.seating_sofa_id WHERE sfg.id = ?;', [insertId], 
        (err, res) => {
            if (err) { reject(err) } else { resolve(res) }
        });
    });
};


module.exports = {
    // tables
    getSeatingTables,
    addSeatingTable,
    getTableGuests,
    addGuestsToSeatingTable,
    // sofas
    getSeatingSofas,
    addSeatingSofa,
    getSofaGuests,
    addGuestsToSeatingSofa,
    //----- 
    getTblGuestInfo,
    getSofaGuestInfo
}