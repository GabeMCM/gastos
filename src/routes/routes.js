const controller = require("../controller/controller");
const routes = require("express").Router();

routes.get("/", controller.init);
routes.post("/save/:choice", controller.saveData);

module.exports = routes;
