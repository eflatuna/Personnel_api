"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
router.use("/auth", require("./auth.router"));

router.use("/departments", require("./department.router"));

router.use("/personnels", require("./personnel.router"));

router.use("/documents", require("./documents.router"));

router.use("/tokens", require("./token.router"));

module.exports = router;
