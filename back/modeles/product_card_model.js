const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  title: String,
  imageSrc: String,
  commonParams: {
    brand: Array
  },
  customParams: Object,
  url: String,
  description: String,
  promo: Boolean
},{collection: "productCardsList"})

module.exports = mongoose.model("productCardsList", todoSchema)
