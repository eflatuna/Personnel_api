"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require("../models/personnel.model");

module.exports = {
	list: async (req, res) => {
		/*
      #swagger.tags = ["Personnels"]
      #swagger.summary = "List Personnels"
      #swagger.description =  `
            You can send query with endpoint for filter[], search[], sort[], page and limit.
            <ul> Examples:
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                <li>URL/?<b>page=2&limit=1</b></li>
            </ul>
        `
    */
		const data = await res.getModelList(Personnel, {}, "departmentId");
		res.status(200).send({
			error: false,
			detail: await res.getModelListDetails(Personnel),
			data,
		});
	},
	create: async (req, res) => {
		/*
      #swagger.tags = ["Personnels"]
    */
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
		/*
      #swagger.tags = ["Personnels"]
    */
		const data = await Personnel.findOne({ _id: req.params.id });
		res.status(200).send({
			error: false,
			data,
		});
	},
	update: async (req, res) => {
		/*
      #swagger.tags = ["Personnels"]
    */
		if (!req.user.isAdmin) {
			req.body.isAdmin = false;
			delete req.body.isLead;
			delete req.body.salary;
			delete req.body.title;
			delete req.body.startedAt;
			delete req.body.isActive;
		}
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
		/*
      #swagger.tags = ["Personnels"]
    */
		const data = await Personnel.deleteOne({ _id: req.params.id });

		res.status(data.deletedCount > 0 ? 204 : 404).send({
			error: !data.deletedCount,
			data,
		});
	},
};
