"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                Documentation                               */
/* -------------------------------------------------------------------------- */
// https://swagger-autogen.github.io/docs/
// $ npm i swagger-autogen
// $ npm i swagger-ui-express
// $ npm i redoc-express

//! SWAGGER & Redoc
const swaggerUi = require("swagger-ui-express");
const redoc = require("redoc-express");

//*swagger
router.use(
	"/swagger",
	swaggerUi.serve,
	swaggerUi.setup(require("../../swagger.json"), {
		swaggerOptions: {
			persistAuthorization: true,
		},
	})
);
//* URL => /documents
//* JSON
router.use("/json", (req, res) => {
	res.sendFile("swagger.json", { root: "." });
});

//? REDOC
router.use(
	"/redoc",
	redoc({
		title: "Personnel Api",
		specUrl: "/documents/json",
	})
);

module.exports = router;
