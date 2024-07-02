"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const PersonnelSchema = new mongoose.Schema(
	{
		departmentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Department",
			required: true,
		},
		username: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			trim: true,
			required: true,
			set: (password) => password.Encrypt(password),
		},
		firstName: {
			type: String,
			trim: true,
			required: true,
		},
		lastName: {
			type: String,
			trim: true,
			required: true,
		},
		phone: {
			type: String,
			trim: true,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			validate: [
				(email) =>
					email.includes("@") && email.split("@")[1].includes("."),
				"Invalid Email",
			],
		},
		title: {
			type: String,
			trim: true,
			required: true,
		},
		salary: {
			type: number,
			default: 0,
		},
		description: {
			type: String,
			trim: true,
			default: null,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		isLead: {
			type: Boolean,
			default: false,
		},
		startedAt: {
			type: Date,
			default: Date.now,
		},
	},

	{
		collection: "personnel",
		timestamps: true,
	}
);

module.exports = mongoose.model("Personnel", PersonnelSchema);
