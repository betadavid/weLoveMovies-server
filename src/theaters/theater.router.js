const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const service = require("./theaters.service");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;