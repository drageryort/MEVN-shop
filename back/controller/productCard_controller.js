const productCard = require("../modeles/product_card_model");

const getAllProductCards = async (req, res) => {
  const allProductCards = await productCard.find();
  res.status(200);
  res.json(allProductCards);
};

const getFilteredProductCards = async (req, res) => {
  const filterParams = req.query
  const productCards = await productCard.find(
    {
      $and: [
        {"commonParams.brand": {$in: ['Asus']}},
        {"commonParams.category": {$in: ['Display']}}
      ]
    });
  console.log(productCards)

  let filteredProductCards = [];

  if (filterParams['minPrice'] && filterParams['maxPrice']) {
    filteredProductCards = productCards.filter(el =>
      Number(filterParams['minPrice'].replace(/ /g, '')) <= Number(el.commonParams['price'].replace(/ /g, '')) &&
      Number(el.commonParams['price'].replace(/ /g, '')) <= Number(filterParams['maxPrice'].replace(/ /g, ''))
    )
  }
  if (filterParams['brand'] && filteredProductCards.length) {
    filteredProductCards = filteredProductCards.filter(el => filterParams['brand'].includes(el.commonParams['brand']))
  } else if (filterParams['brand']) {
    filteredProductCards = productCards.filter(el => filterParams['brand'].includes(el.commonParams['brand']))
  }

  if (filterParams['category'] && filteredProductCards.length) {
    filteredProductCards = filteredProductCards.filter(el => filterParams['category'].includes(el.commonParams['category']))
  } else if (filterParams['category']) {
    filteredProductCards = productCards.filter(el => filterParams['category'].includes(el.commonParams['category']))
  }

  res.status(200);
  res.json(filteredProductCards);
};

const getProductCardById = async (req, res) => {
  const getProductCardByUrl = await productCard.findOne({url: req.params.id}).exec();
  res.status(200);
  res.json(getProductCardByUrl);
};

module.exports = {
  getAllProductCards,
  getFilteredProductCards,
  getProductCardById
}
