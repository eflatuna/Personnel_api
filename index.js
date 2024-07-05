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

/* ------------------------------------------------------- */
//* MORGAN LOGGING
// https://expressjs.com/en/resources/middleware/morgan.html
// https://github.com/expressjs/morgan
//? npm i morgan

const morgan = require("morgan");

// app.use(morgan("combined"))
// app.use(morgan("common"))
// app.use(morgan("dev"))
// app.use(morgan("short"))
// app.use(morgan("tiny"))
// app.use(
// 	morgan(
// 		'IP=:remote-addr - :remote-user | TIME=[:date[clf]] | "METHOD=:method | URL=:url | HTTP/:http-version" | STATUS=:status | LENGTH=:res[content-length] |  REF=":referrer" | AGENT=":user-agent"'
// 	)
// );

// //! write logs to a file
// // create a write stream (in append mode)
// const fs = require("node:fs"); //* dosya işlemleri için built-in module
// // var accessLogStream = fs.createWriteStream("./access.log", { flags: 'a+' })

// // setup the logger
// // app.use(morgan('combined', { stream: accessLogStream }))
// app.use(
// 	morgan("combined", {
// 		stream: fs.createWriteStream("./access.log", { flags: "a+" }),
// 	})
// );
//! write logs to a file day by day
const fs = require("node:fs");

const now = new Date().toISOString().split("T")[0];
console.log(typeof now, now);

app.use(
	morgan("combined", {
		stream: fs.createWriteStream(`./logs/${now}.log`, { flags: "a+" }),
	})
);
/* -------------------------------------------------------------------------- */
/*                                 Documentation                               */
/* -------------------------------------------------------------------------- */
// https://swagger-autogen.github.io/docs/
// $ npm i swagger-autogen
// $ npm i swagger-ui-express
// $ npm i redoc-express
app.use("/documents/json", (req, res) => {
	res.sendFile("swagger.json", { root: "." });
});

//!Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use(
	"/documents/swagger",
	swaggerUi.setup(swaggerDocument, {
		swaggerOptions: {
			persistAuthorization: true,
		},
	})
);
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
	});
});
// console.log("6682f675c85e532d286f602e"+Date.now())
// app.use("/departments", require("./src/routes/department.router"));

// app.use("/personnels", require("./src/routes/personnel.router"));

// app.use("/tokens",require("./src/routes/token.router"))

// app.use(require("./src/routes/index"));
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
