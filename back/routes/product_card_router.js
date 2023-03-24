const express = require("express");
const router = express.Router();
const {getAllProductCards, getProductCardById, getFilteredProductCards} = require("../controller/productCard_controller");


// Get all todoData
router.get("/getCards", getAllProductCards);
router.get("/filterCards", getFilteredProductCards);

// Get todoData by id
router.get('/getCard/:id', getProductCardById);

module.exports = router
