"use strict";

const Token = require("../models/token.model");

module.exports = async (req, res, next) => {
	// console.log(req.headers);
	const auth = req.headers?.authorization || null;
	console.log(auth);
	const tokenKey = auth ? auth.split(" ") : null;
	// console.log(tokenKey);
	if (tokenKey && tokenKey[0] == "Token") {
		const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
			"userId"
		);

		// console.log(tokenData);
		if (tokenData) req.user = tokenData.userId;
	}

	next();
};
