const router = require("express").Router();

const token = require("../controllers/department.controller");

const idValidation = require("../middlewares/idValidation");

//*url: /tokens

router.route("/").get(token.list).post(token.create);

router
	.route("/:id")
	.all(idValidation)
	.get(token.read)
	.put(token.update)
	.patch(token.update)
	.delete(token.delete);

module.exports = router;
