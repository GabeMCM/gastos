const user = require("../models/model");
const dataService = require("../services/data.Service");

/* ----------------------------------- */
const init = (req, res) => {
	//função para renderizar o index
	res.render("index");
};

const saveData = (req, res) => {
	//controller que salva os dados no banco de dados correspondente com o que precisa ser lançado
	const form = req.body;
	const choice = req.params.choice;

	const f_account = new user.fixedAccounts(form);
	const t_Account = new user.termAccounts(form);
	const d_Account = new user.dailyAccounts(form);

	if (choice == "fixedAccount") {
		dataService.sendData(f_account);
	} else if (choice == "termAccount") {
		dataService.sendData(t_Account);
	} else {
		dataService.sendData(d_Account);
	}

	res.redirect("/");
};

const showData = async (req, res) => {
	try {
		const dataComplet = await dataService.getAllData();
		console.log(dataComplet);
		res.render("showData", {dataComplet})
		//res.redirect("/");
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

module.exports = {
	init,
	saveData,
	showData,
};
