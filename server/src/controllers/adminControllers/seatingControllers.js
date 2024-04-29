const seatingServices = require('../../services/adminServices/seatingServices');
const { handleError, handleErrorLog } = require('../../utils/handleError');
const { sendWtspSeatingTblAssigned } = require('../../utils/sendWtspSeatingTblAssigned');

const getSeatingTables = (req, res) => {
    seatingServices.getSeatingTables((error, response) => {
        if (error) return handleError("Error at getting all guests seating tables data", res, error);

        res.status(200).json(response);
    })
}
const addSeatingTable = (req, res) => {
    const newSeatingTable = req.body;
    seatingServices.addSeatingTable(newSeatingTable, (error, response) => {
        if (error) return handleError("Error at adding a seating tables", res, error);

        if (response){
            res.status(200).json({Status: "Success"});
        }
    })
}
const getTableGuests = (req, res) => {
    const { tableNumber } = req.params;
    seatingServices.getTableGuests(tableNumber, (error, response) => {
        if (error) return handleError("Error at fetching fetching table guests", res, error);

        if (response){
            res.status(200).json(response);
        }
    })
}
const addGuestsToSeatingTable = (req, res) => {
    seatingServices.addGuestsToSeatingTable(req.body.params, (error, response) => {
        if (error) return handleError("Error adding guests to seating table: ", res, error);

        if (response){
            response.map(async (item, idx) => {
                const {insertId} = item;
                try {
                    const GIRes = await seatingServices.getTblGuestInfo(insertId);
                    if(GIRes){
                        const { mobile_number, bnf_name, ticket_number, seating_table_id, seat_no, seat } = GIRes[0];
                        await sendWtspSeatingTblAssigned({
                            userMobileNumber: mobile_number,
                            ticketQrImageLink: "https://nutrifycsuite.com/images/scanner_img.jpg",
                            ticketNumber: ticket_number,
                            name: bnf_name,
                            tableNo: seating_table_id,
                            seatNo: seat_no,
                            fullSeat: seat
                        });
                    }
                } catch (err) {
                    return handleErrorLog("Error adding guests to seating table: ", err);
                }
            })
            res.status(200).json({Status: "Success"});
        }
    })
}

const getSeatingSofas = (req, res) => {
    seatingServices.getSeatingSofas((error, response) => {
        if (error) return handleError("Error at getting all guests seating sofas", res, error);

        res.status(200).json(response);
    })
}
const addSeatingSofa = (req, res) => {
    const newSeatingSofa = req.body;
    seatingServices.addSeatingSofa(newSeatingSofa, (error, response) => {
        if (error) return handleError("Error at adding a seating Sofa", res, error);

        if (response){
            res.status(200).json({Status: "Success"});
        }
    })
}
const getSofaGuests = (req, res) => {
    const { sofaNumber } = req.params;
    seatingServices.getSofaGuests(sofaNumber, (error, response) => {
        if (error) return handleError("Error at fetching fetching sofa guests", res, error);

        if (response){
            res.status(200).json(response);
        }
    })
}
const addGuestsToSeatingSofa = (req, res) => {
    seatingServices.addGuestsToSeatingSofa(req.body.params, (error, response) => {
        if (error) return handleError("Error adding guests to seating sofa: ", res, error);

        if (response){
            response.map(async (item, idx) => {
                const { insertId } = item;
                try {
                    const GIRes = await seatingServices.getSofaGuestInfo(insertId);
                    if(GIRes){
                        const { mobile_number, bnf_name, ticket_number, seating_sofa_no, seat_no, seat } = GIRes[0];
                        await sendWtspSeatingTblAssigned({
                            userMobileNumber: mobile_number,
                            ticketQrImageLink: "https://nutrifycsuite.com/images/scanner_img.jpg",
                            ticketNumber: ticket_number,
                            name: bnf_name,
                            tableNo: seating_sofa_no,
                            seatNo: seat_no,
                            fullSeat: seat
                        });
                    }
                } catch (err) {
                    return handleErrorLog("Error adding guests to seating sofa: ", err);
                }
            })
            res.status(200).json({Status: "Success"});
        }
    })
}

const getStngInfoByGid = (req, res) => {
    const { guestId } = req.params;
    seatingServices.getStngInfoByGid(guestId, (error, response) => {
        if (error) return handleErrorLog("Error at fetching Seating Details by Guest Id:", error);

        if (response){ res.status(200).json(response) }
    })
}

module.exports = {
    // tables
    getSeatingTables,
    addSeatingTable,
    getTableGuests,
    addGuestsToSeatingTable,
    // Sofas
    getSeatingSofas,
    addSeatingSofa,
    getSofaGuests,
    addGuestsToSeatingSofa,
    // -----
    getStngInfoByGid
}