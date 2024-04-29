const ticketServices = require('../services/ticketServices');
const { handleError } = require('../utils/handleError');

const getAllTickets = async (req, res) => {
    ticketServices.getAllTickets((error, response) => {
        if (error) handleError("err at ticket fetching:", res, error);

        res.status(200).json(response);
    })
}

const getTicketPrice = async (req, res) => {
    ticketServices.getTicketPrice((error, response) => {
        if (error) handleError("err at ticket fetching price:", res, error);

        if (response){
            res.status(200).json(response[0].value);
        }
    })
}

const SetNewPrice = async (req, res) => {
    const { newPrice } = req.params;

    ticketServices.SetNewPrice(newPrice, (error, response) => {
        if (error) handleError("err at setting new ticket price:", res, error);

        if (response){
            res.status(200).json({Status: "Success"});
        }
    })
}

const getTktInfo = async (req, res) => {
    const { ticketId } = req.params;

    ticketServices.getTktInfo(ticketId, (error, response) => {
        if (error) handleError("err at ticket info fetching:", res, error);

        res.status(200).json(response[0]);
    })
}

const fetchTicketData = async (req, res) => {
    const { ticketId } = req.params;

    ticketServices.fetchTicketData(ticketId, (error, response) => {
        if (error) handleError("err at ticket info fetching:", res, error);

        res.status(200).json(response);
    })
}

const getBenificairyDetails = async (req, res) => {
    const { bnfId } = req.params;

    ticketServices.getBenificairyDetails(bnfId, (error, response) => {
        if (error) handleError("err at ticket benificairy fetching:", res, error);

        res.status(200).json(response);
    })
}

const getBillingDetails = async (req, res) => {
    const { billingId } = req.params;

    ticketServices.getBillingDetails(billingId, (error, response) => {
        if (error) handleError("err at ticket billing fetching:", res, error);

        res.status(200).json(response);
    })
}

const getPaymentDetails = async (req, res) => {
    const { paymentId } = req.params;

    ticketServices.getPaymentDetails(paymentId, (error, response) => {
        if (error) handleError("err at ticket billing fetching:", res, error);

        res.status(200).json(response);
    })
}

module.exports = {
    getAllTickets,
    getTicketPrice,
    SetNewPrice,
    getTktInfo,
    fetchTicketData,
    getBenificairyDetails,
    getBillingDetails,
    getPaymentDetails
};