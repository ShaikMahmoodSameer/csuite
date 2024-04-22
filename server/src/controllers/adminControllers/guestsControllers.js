const guestServices = require('../../services/adminServices/guestServices');
const { handleError } = require('../../utils/handleError');

const getAllGuests = (req, res) => {
    guestServices.getAllGuests((error, response) => {
        if (error) return handleError("Error at getting all guests", res, error);
        { res.status(200).json(response); }
    })
}

const getUnseatedGuests = (req, res) => {
    guestServices.getUnseatedGuests((error, response) => {
        if (error) return handleError("Error at unseated guests", res, error);
        { res.status(200).json(response); }
    })
}

module.exports = {
    getAllGuests,
    getUnseatedGuests
}