const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authFunctions = require('../middlewares/authToken');

router.post('/login', userController.login);
router.post('/signup', userController.addUser);
router.get('/getById', authFunctions.authenticateToken, userController.getUserById);
router.get('/getAll', authFunctions.authenticateToken, userController.getAllUsers);
router.put('/update', authFunctions.authenticateToken, userController.updateUser);
router.delete('/delete', authFunctions.authenticateToken, userController.deleteUser);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword', userController.resetPassword);
router.post('/updatePassword', authFunctions.authenticateToken, userController.updatePassword);

module.exports = router;
