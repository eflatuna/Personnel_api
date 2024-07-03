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
			}
		}
	},
	logout: (req, res) => {},
};
