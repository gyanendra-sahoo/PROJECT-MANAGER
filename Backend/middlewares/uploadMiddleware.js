const multer = require('multer');

// Set up storage engine
const storage = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, uniqueSuffix + '-' + file.originalname);
        }
});


const fileFilter = (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
                cb(null, true);
        } else {
                cb(new Error('Invalid file type. Only JPEG, PNG and JPG are allowed.'), false);
        }
};


const upload = multer({
        storage: storage,
        limits: { fileSize: 1024 * 1024 * 5 },
        fileFilter: fileFilter
});

module.exports = upload;