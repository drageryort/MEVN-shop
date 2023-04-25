const mongoose = require("mongoose");
const productCardSchema = new mongoose.Schema({
  title: String,
  imageSrc: String,
  commonParams: {
    brand: String,
    category: String,
    price: Number
  },
  customParams: Object,
  url: String,
  description: String,
  promo: Boolean
},{collection: "productCardsList"})

module.exports = mongoose.model("productCardsList", productCardSchema)
