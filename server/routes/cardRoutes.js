const express = require('express');
const {getCards, addCards, getCardsById, updateCards, deleteCards } = require('../controller/cardController');
const router = express.Router();
const verifyToken = require("../middleware/verifyToken")

const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.get('/cards', verifyToken, getCards)
router.get('/cards/:id', verifyToken, getCardsById)
router.put('/cards/:id', verifyToken, updateCards)
router.delete('/cards/:id', verifyToken, deleteCards);
router.post('/cards', verifyToken, upload.single('image'), addCards);


module.exports = router