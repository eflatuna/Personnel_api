"use strict";

const router = require("express").Router();

const auth = require("../controllers/auth.controller");

//*url =>  /auth

router.post("./login", auth.login);

module.exports = router;
