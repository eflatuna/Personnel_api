"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
*/

const express = require("express");
const app = express();

/* ------------------------------------------------------- */

//Required Modules

//*envVariable to process.env

require("dotenv").config();
const PORT = process.env.PORT || 8000;

//asyncErrors to errorHandler
require("express-async-errors");

//*------------------------------------- CONFIGURATIONS ---------------------------------------------*/

//!database connection
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

//*--------------------------------------- MIDDLEWARES ---------------------------------------------------*/

//!accept json-RestAPI!
app.use(express.json());

//!Filter,Search,Sort,Pagination
app.use(require("./src/middlewares/findSearchSortPagi"));

//*----------------------------------------- ROUTES ------------------------------------------------------- */

app.all("/", (req, res) => {
	res.send("Welcome to the Personnel API");
});
// console.log("6683bd25e560c6a181877cc2" + Date.now());

// app.use("/departments", require("./src/routes/department.router"));
// app.use("/personnels", require("./src/routes/personnel.router"));
// app.use("/tokens", require("./src/routes/token.router"));

// app.use(require("./src/routes/index"));
app.use(require("./src/routes/"));

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// require("./src/helpers/sync")();
