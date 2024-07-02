"use strict";

const { mongoose } = require("../configs/dbConnection");

module.exports = (req, res, next) => {
	const idIsValid = mongoose.Types.ObjectId.isValid(req.params.id);
	if (!idIsValid) throw new Error("Id is not valid!");
	next();
};
