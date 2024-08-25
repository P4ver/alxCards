const express = require('express');
const {getCards, addCards, getCardsById, updateCards, deleteCards} = require('../controller/cardController');
const router = express.Router();
const verifyToken = require("../middleware/verifyToken")

router.get('/cards', verifyToken, getCards)
router.get('/cards/:id', verifyToken, getCardsById)
router.put('/cards/:id', verifyToken, updateCards)
router.post('/cards', verifyToken, addCards)
router.delete('/cards/:id', verifyToken, deleteCards);

module.exports = router