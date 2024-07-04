"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const personnel = require("../controllers/personnel.controller");
const idValidation = require("../middlewares/idValidation");
const permission = require("../middlewares/permissions");

//* URL : /personnels

router
	.route("/")
	.get(permission.isAdmin, personnel.list)
	.post(permission.isAdmin, personnel.create);

router
	.route("/:id")
	.all(idValidation)
	.get(permission.isAdminOrOwn, personnel.read)
	.put(permission.isAdminOrOwn, personnel.update)
	.patch(permission.isAdminOrOwn, personnel.update)
	.delete(permission.isAdmin, personnel.delete);

/* ------------------------------------------------------- */
module.exports = router;
