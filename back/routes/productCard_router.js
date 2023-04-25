const express = require("express");
const router = express.Router();
const {getProductCardById, getProductCards, getFilters} = require("../controller/productCard_controller");


// Get all cards
router.get("/getCards", getProductCards);
router.get("/getFilters", getFilters);

// Get cards by id
router.get('/getCard/:id', getProductCardById);

module.exports = router
