const controller = require("../controller/controller");
const routes = require("express").Router();

routes.get("/", controller.init);
routes.post("/save/:choice", controller.saveData);
routes.get("/show", controller.showData);

module.exports = routes;
