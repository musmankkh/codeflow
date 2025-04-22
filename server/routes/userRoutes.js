const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../controllers/userController.js');
const { registerValidator, loginValidator } = require( '../validators/userValidator.js');
const { validate } = require('../middleware/validateMiddleware.js');
const { protect, isAdmin } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/register', registerValidator, validate, registerUser);
router.post('/login', loginValidator, validate, loginUser);
router.get('/', protect, isAdmin, getAllUsers);

module.exports = router;
