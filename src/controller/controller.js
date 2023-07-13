const user = require("../models/model");
const dataService = require("../services/data.Service");
const filterService = require("../services/filter.Service");

/* ----------------------------------- */
const init = async (req, res) => {
	//função para renderizar o index
	try {
		const dataComplet = await dataService.showData();
		dataService.showData();
		res.render("index", { dataComplet });
		//res.redirect("/");
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

const saveData = (req, res) => {
	//controller que salva os dados no banco de dados correspondente com o que precisa ser lançado
	const form = req.body;
	const choice = req.params.choice;
	const d_Account = new user.dailyAccounts(form);

	try {
		if (choice == "fixedAccount") {
			dataService.processingDate(form);
			const f_Account = new user.fixedAccounts(form);
			dataService.sendData(f_Account);
		} else if (choice == "termAccount") {
			const termFilter = filterService.filterCurrentDueData(form);
			termFilter.forEach((obj) => {
				const t_Account = new user.termAccounts(obj);
				dataService.sendData(t_Account);
			});
		} else if (choice == "dailyAccount") {
			dataService.sendData(d_Account);
		}
		res.redirect("/");
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

module.exports = {
	init,
	saveData,
	testData,
};
