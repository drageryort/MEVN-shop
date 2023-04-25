require('dotenv').config()
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const app = express();
const PORT = process.env.PORT || 3000;

const errorMiddleWare = require("./middlewares/error-middleware");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routing

const shopRoutes = require("./routes/productCard_router");
const userRoutes = require("./routes/user_router");

app.use('/api', shopRoutes);
app.use('/api', userRoutes);
app.use(errorMiddleWare);



// Start server
const startServer = async () => {
  try {
    mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => console.log("DB is connected"))
      .catch(err => console.log("DB connection error", err))

    app.listen(PORT, () => console.log(`server is started on port ${PORT}`));
  } catch (e) {
    console.error(e)
  }
}
startServer()
