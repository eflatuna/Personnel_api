"use strict";
/* -------------------------------------------------------
EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require("../models/personnel.model");
const Token = require("../models/token.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
	login: async (req, res) => {
		const { username, password } = req.body;
		if (username && password) {
			//? findOne metodu filtreleme yaparken modeldki set fonksiyonlarını çalıştırır. Burada da ek bir işleme ihtiyaç olmadan passwordu modeldeki set metodundaki encrypt i kullanarak işlemden geçirip db'de filtreleme yapar
			const user = await Personnel.findOne({ username, password });
			if (user && user.isActive) {
				//*bu usera ait token var mı kontrol et
				let tokenData = await Token.findOne({ userId: user._id });

				//? eğer token yoksa bu usera yeni bir token oluştur
				if (!tokenData) {
					const tokenKey = passwordEncrypt(user._id + Date.now());
					// console.log(user._id + Date.now());
					tokenData = await Token.create({
						userId: user._id,
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
			res.errorStatusCode = 400;
			throw new Error("username or password is required.");
		}
	},
	logout: async (req, res) => {
		//1.Yöntem-Kisa Yöntem:userId unique olunca
		// console.log(req.user);
		// const deleted = await Token.deleteOne({ userId: req.user_id });

		//1.Yöntem-Kisa Yöntem :Her cihazdan cikis yapmasi saglanir
		// console.log(req.user);
		// const deleted = await Token.deletemANY({ userId: req.user_id });

		//2.Yöntem-Birden fazla token bilgisi olursa
		//!bizim senaryomuzda userId ve token unique dir
		const auth = req.headers?.authorization || null;
		const tokenKey = auth ? auth.split(" ") : null;

		let deleted = null;
		if (tokenKey && tokenKey[0] == "Token") {
			deleted = await Token.deleteOne({ token: tokenKey[1] });
		}

		res.status(deleted.deletedCount > 0 ? 200 : 400).send({
			error: !deleted.deletedCount,
			data,
			message:
				deleted.deletedCount > 0 ? "Logout Success" : "Logout Failed",
		});
	},
};
