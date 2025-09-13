const express = require('express');
const { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile } = require('../controllers/authControllers');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Auth Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.put ('/profile', protect, updateUserProfile);

module.exports = router;