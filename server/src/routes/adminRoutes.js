const express = require('express');
const router = express.Router();
const { getSeatingTables, addSeatingTable, getTableGuests, addGuestsToSeatingTable, getSeatingSofas, addSeatingSofa, getSofaGuests, addGuestsToSeatingSofa } = require('../controllers/adminControllers/SeatingControllers');
const { getUnseatedGuests, getAllGuests } = require('../controllers/adminControllers/guestsControllers');
const { getMtngTbls, addMtngTbl, getMtngGuests, addGuestsToMeetingTable } = require('../controllers/adminControllers/meetingControllers');

router.get('/guests', getAllGuests);
router.get('/guests/get-unseated-guests', getUnseatedGuests)

router.get('/seatings/get-seating-tables', getSeatingTables);
router.post('/seatings/add-seating-table', addSeatingTable);
router.get('/seatings/table-guests/:tableNumber', getTableGuests);
router.post('/seatings/add-guests-to-table', addGuestsToSeatingTable);

router.get('/seatings/get-seating-sofas', getSeatingSofas);
router.post('/seatings/add-seating-sofa', addSeatingSofa);
router.get('/seatings/sofa-guests/:sofaNumber', getSofaGuests);
router.post('/seatings/add-guests-to-sofa', addGuestsToSeatingSofa);

router.get('/meetings/get-meeting-tables', getMtngTbls)
router.get('/meeting/table-guests/:tableNumber', getMtngGuests);
router.post('/meetings/add-meeting-table', addMtngTbl);
router.post('/meetings/add-guests-to-table', addGuestsToMeetingTable);

module.exports = router