const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authFunctions = require('../middlewares/authToken');

router.post('/add', authFunctions.authenticateToken, paymentController.addPayment);
router.get('/getById', authFunctions.authenticateToken, paymentController.getPaymentById);
router.get('/getAll', authFunctions.authenticateToken, paymentController.getAllPayments);
router.put('/update', authFunctions.authenticateToken, paymentController.updatePayment);
router.delete('/delete', authFunctions.authenticateToken, paymentController.deletePayment);

module.exports = router;
