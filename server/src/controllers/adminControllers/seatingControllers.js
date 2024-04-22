const seatingServices = require('../../services/adminServices/seatingServices');
const { handleError } = require('../../utils/handleError');

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
            res.status(200).json({Status: "Success"});
        }
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
    addGuestsToSeatingSofa
}