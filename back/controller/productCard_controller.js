const productCard = require("../modeles/productCard_model");


const getFilters = async (req, res) => {
  const filtersList = await productCard.aggregate([
    {$project: {_id: 0,commonParams: "$commonParams"}},
    {$unwind: '$commonParams'},
    {$replaceRoot: {newRoot: "$commonParams"}}

  ]);

  res.status(200);
  res.json(filtersList);
};

const getProductCards = async (req, res) => {
  const query = req.query;
  let filterParams = {};

  for(let [key,value] of Object.entries(query)){
    if(key === 'minPrice'){
      filterParams[`commonParams.price`] = {$lte: query['maxPrice'], $gte: query['minPrice']}
     } else if(key !== 'maxPrice'){
      filterParams[`commonParams.${key}`] = {$in: value}
    }
  }

  let productCardsList = await productCard.find(filterParams);
  res.status(200);
  res.json(productCardsList);
};

const getProductCardById = async (req, res) => {
  const getProductCardByUrl = await productCard.findOne({url: req.params.id}).exec();
  res.status(200);
  res.json(getProductCardByUrl);
};

module.exports = {
  getFilters,
  getProductCards,
  getProductCardById
}
