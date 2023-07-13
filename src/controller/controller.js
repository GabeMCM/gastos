const user = require("../models/model");
const dataService = require("../services/data.Service");
const calcService = require("../services/calc.Service");

/* ----------------------------------- */
const init = async (req, res) => {
	//função para renderizar o index
	try {
		const dataComplet = await dataService.getAllData();
		dataService.showData();
		res.render("index", { dataComplet });
		//res.redirect("/");
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

const saveData = async (req, res) => {
	//controller que salva os dados no banco de dados correspondente com o que precisa ser lançado
	const form = req.body;
	const choice = req.params.choice;

	const f_Account = new user.fixedAccounts(form);
	const d_Account = new user.dailyAccounts(form);

	try {
		if (choice == "fixedAccount") {
			await dataService.sendData(f_Account);
		} else if (choice == "termAccount") {
			const termObject = calcService.calcCount(
				form.descricao,
				form.vencimento,
				form.valor,
				form.quantParcelas
			);

			for (let i = 0; i < termObject.monthList.length; i++) {
				const formObject = {
					descricao: termObject.description,
					vencimento: termObject.monthList[i],
					valor: termObject.installmentsValor,
					quantParcelas: termObject.installmentsList[i],
				};

				const t_Account = new user.termAccounts(formObject);
				await dataService.sendData(t_Account);
			}
		} else if (choice == "dailyAccount") {
			await dataService.sendData(d_Account);
		}
		res.redirect("/");
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

module.exports = {
	init,
	saveData,
};
