const express = require('express');
const router = express.Router();
const ticketControllers = require('../controllers/ticketControllers');

router.get('/', ticketControllers.getAllTickets);
router.get('/get-price', ticketControllers.getTicketPrice);
router.post('/set-price/:newPrice', ticketControllers.SetNewPrice);

router.get('/:ticketId', ticketControllers.getTktInfo);
router.get('/ticketFullData/:ticketId', ticketControllers.fetchTicketData);

router.get('/bnf-details/:bnfId', ticketControllers.getBenificairyDetails);
router.get('/billing-details/:billingId', ticketControllers.getBillingDetails);
router.get('/payment-details/:paymentId', ticketControllers.getPaymentDetails);

module.exports = router;