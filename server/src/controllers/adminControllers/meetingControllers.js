const meetingServices = require('../../services/adminServices/meetingServices');
const { handleErrorLog } = require('../../utils/handleError');

const getMtngTbls = (req, res) => {
    meetingServices.getMeetingTbls((error, response) => {
        if (error) return handleErrorLog("Unable to get Meeting Table: ", error);

        res.status(200).json(response);
    })
}

const addMtngTbl = (req, res) => {
    const newMtngTbl = req.body;
    meetingServices.addMtngTbl(newMtngTbl, (error, response) => {
        if (error) return handleErrorLog("Unable to Add New Meeting Table: ", res, error);

        if (response){
            res.status(200).json({Status: "Success"});
        }
    })
}

const getMtngGuests = (req, res) => {
    const { tableNumber } = req.params;
    meetingServices.getMtngGuests(tableNumber, (error, response) => {
        if (error) return handleErrorLog("Error at fetching fetching table guests", res, error);

        if (response){
            res.status(200).json(response);
        }
    })
}

const addGuestsToMeetingTable = (req, res) => {
    meetingServices.addGuestsToMeetingTable(req.body.params, (error, response) => {
        if (error) return handleErrorLog("Error adding guests to meeting table: ", res, error);

        if (response){
            res.status(200).json({Status: "Success"});
        }
    })
}

module.exports = {
    getMtngTbls,
    addMtngTbl,
    getMtngGuests,
    addGuestsToMeetingTable
}