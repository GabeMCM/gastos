const express = require("express");
const routes = require("./src/routes/routes");
const connectDB = require("./src/database/mongo");
const path = require("path");

const app = express();

//porta e informações para aparecerem no console.
const port = 3030;
const communication = () => {
	console.log(`Servidor rodando em http://localhost:${port}`);
};

//Engine do projeto é ejs
app.set("view engine", "ejs");

//converte o enctype(tipo de codificaçao do formulário html) padrão(application/x-www-form-urlencoded) para objeto js
app.use(express.urlencoded());

//acessando a pasta public para conectar com css e js no ejs
app.use(express.static(path.join(__dirname, "public")));

//conectando com banco de dados
connectDB();

//Usando as rotas definidas
app.use("/", routes);

//Start do código
app.listen(port, communication);
