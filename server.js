const express = require("express");
const bodyParser = require('body-parser');
require("dotenv").config({ path: "./config/.env" });
const userRoutes = require('./routes/user.route');
require("./config/db");
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.use('/api/user', userRoutes)

//server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
