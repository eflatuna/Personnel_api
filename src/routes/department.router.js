"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const department = require("../controllers/department.controller");
const idValidation = require("../middlewares/idValidation");
const permission = require("../middlewares/permissions");

//* URL : /departments

router
	.route("/")
	.get(permission.isLogin, department.list)
	.post(permission.isAdmin, department.create);

router.route("/:id/personnels").get(department.personnels); //* departmana göre personel listeleme

router
	.route("/:id")
	.all(idValidation)
	.get(permission.isLogin, department.read)
	.put(permission.isAdmin, department.update)
	.patch(permission.isAdmin, department.update)
	.delete(permission.isAdmin, department.delete);

/* ------------------------------------------------------- */
module.exports = router;
