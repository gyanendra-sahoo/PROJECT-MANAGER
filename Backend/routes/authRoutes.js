const express = require('express');
const { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile } = require('../controllers/authControllers');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Auth Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.put ('/profile', protect, updateUserProfile);


router.post('/upload-image', upload.single('image'), (req, res) => {
        if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
        }
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        res.status(200).json({ imageUrl });
});

module.exports = router;