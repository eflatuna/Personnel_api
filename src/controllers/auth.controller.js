"use strict";
const Personnel = require("../models/personnel.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
	login: async (req, res) => {
		const { username, password } = req.body;

		if (username && password) {
			const user = await Personnel.findOne({ username, password });

			if (user && user.isActive) {
				let tokenData = await Token.findOne({ userId: user._id });

				if (!tokenData) {
					const tokenKey = passwordEncrypt(user._id + Date.now());

					tokenData = await Token.create({
						userId: user_id,
						token: tokenKey,
					});
				}
				res.status(200).send({
					error: false,
					token: tokenData.token,
					user,
				});
			} else {
				res.errorStatusCode = 401;
				throw new Error("Wrong Username or Password.");
			}
		} else {
			res.errorStatusCode = 401;
			throw new Error("username or password is required!");
		}
	},
	logout: (req, res) => {},
};
