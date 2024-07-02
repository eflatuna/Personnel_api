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

app.use("/departments", require("./src/routes/department.router"));
app.use("/personnels", require("./src/routes/personnel.router"));

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
