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
// Required Modules

//* envVariables to process.env
require("dotenv").config();
const PORT = process.env.PORT || 8000;

//? asyncErrors to errorHandler
require("express-async-errors");

/* -------------------------------------------------------------------------- */
/*                               Configurations                               */
/* -------------------------------------------------------------------------- */

//! database connection
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();
/* -------------------------------------------------------------------------- */
/*                                 MiddleWares                                */
/* -------------------------------------------------------------------------- */

//* accept json
app.use(express.json());

app.use(require("./src/middlewares/logging"));

//*Filter,Search,Sort,Pagination(res.getModelList)
app.use(require("./src/middlewares/findSearchSortPagi"));

app.use(require("./src/middlewares/authentication"));

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */

app.all("/", (req, res) => {
	// res.send("Welcome to the Personnel API")
	res.send({
		message: "Welcome to the Personnel API",
		user: req.user,
		api: {
			documents: {
				swagger: "/documents/swagger",
				redoc: "/documents/redoc",
				json: "/documents/json",
			},
		},
	});
});

app.use(require("./src/routes/"));

//* eşleşmeyen routeları yakalar
app.use((req, res, next) => {
	res.status(404).send({
		error: true,
		message: "Route not found!",
	});
});

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// require("./src/helpers/sync")()
