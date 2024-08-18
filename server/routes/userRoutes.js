const express = require("express")
const router = express.Router()
const getUsers = require("../controller/userController")
const verifyToken = require("../middleware/verifyToken")


router.get('/user', verifyToken, getUsers)

module.exports = router