"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require("../models/personnel.model");

module.exports = {
	list: async (req, res) => {
		const data = await res.getModelList(Personnel, {}, "departmentId");
		res.status(200).send({
			error: false,
			detail: await res.getModelListDetails(Personnel),
			data,
		});
	},
	create: async (req, res) => {
		const isLead = req.body?.isLead || false;
		let message = "Yeni personel eklendi.";
		if (isLead) {
			const isUpdated = await Personnel.updateMany(
				{
					departmentId: req.body.departmentId,
					isLead: true,
				},
				{ isLead: false }
			);
			console.log(isUpdated);
			if (isUpdated.modifiedCount) {
				message = "Önceki leadler kaldırıldı.Yeni personel eklendi.";
			}
		} //* Her takımın tek bir lideri olmak zorunda

		const data = await Personnel.create(req.body);

		res.status(201).send({
			error: false,
			data,
			message,
		});
	},
	read: async (req, res) => {
		const data = await Personnel.findOne({ _id: req.params.id });
		res.status(200).send({
			error: false,
			data,
		});
	},
	update: async (req, res) => {
		const isLead = req.body?.isLead || false;
		if (isLead) {
			const { departmentId } = await Personnel.findOne({
				_id: req.params.id,
			});
			console.log(departmentId);
			await Personnel.updateMany(
				{
					departmentId,
					isLead: true,
				},
				{ isLead: false }
			);
		}
		const data = await Personnel.updateOne(
			{ _id: req.params.id },
			req.body,
			{
				runValidators: true, //* modelde var olan validate fonksiyonlarının(built-in ve custom) update işlemi sırasında çalışmasını sağlayan özellik *** default off(false)
			}
		);
		res.status(202).send({
			error: false,
			data,
			newData: await Personnel.findOne({ _id: req.params.id }),
		});
	},
	delete: async (req, res) => {
		const data = await Personnel.deleteOne({ _id: req.params.id });

		res.status(data.deletedCount > 0 ? 204 : 404).send({
			error: !data.deletedCount,
			data,
		});
	},
};
