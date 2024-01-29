const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authFunctions = require('../middlewares/authToken');

router.post('/add', authFunctions.authenticateToken, eventController.addEvent);
router.get('/getById', authFunctions.authenticateToken, eventController.getEventById);
router.get('/getAll', authFunctions.authenticateToken, eventController.getAllEvents);
router.put('/update', authFunctions.authenticateToken, eventController.updateEvent);
router.delete('/delete', authFunctions.authenticateToken, eventController.deleteEvent);

module.exports = router;
