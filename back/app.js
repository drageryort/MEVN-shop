const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use((req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
})

const uri = "mongodb+srv://drageryort:azxcvb8121991@cluster0.ajlurz3.mongodb.net/productCards?retryWrites=true&w=majority"
mongoose
  .connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
  })
  .then(()=> console.log("DB is connected"))
  .catch(err => console.log("DB connection error", err))

app.use(bodyParser.json());

// Routing
app.get("/", (req, res) => {
  res.send("Hello world")
});

const todoRoutes = require("./routes/product_card_router");
app.use('/products', todoRoutes)

// Start server
app.listen(3000, () => console.log('server is started on 3000'));
