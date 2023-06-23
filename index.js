const express = require("express");
const routes = require("./src/routes/routes");
const mongo = require("./src/database/mongo");

const app = express();

const port = 3030;

const communication = () => {
	console.log(`Servidor rodando em http://localhost:${port}`);
};

mongo();

app.set("view engine", "ejs");

app.use(express.urlencoded());

app.use("/", routes);

app.listen(port, communication);
