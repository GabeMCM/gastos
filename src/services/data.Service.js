const user = require("../models/model");

const dataService = {
	sendData: (collection) => {
		//Envia e salva os dados para cada collection dentro do banco de dados.
		collection
			.save()
			.then(() => {
				console.log("Dados salvos corretamente");
			})
			.catch((error) => {
				console.error("Erro ao salvar:", error);
			});
	},

	getOneData: async (model) => {
		//Procura e tras do banco de dados apenas os dados de uma collection específica.
		const dataList = await model.find();
		return dataList;
	},

	getAllData: async () => {
		//Acessa cada collection e pega os dados de todas.
		const daily = await user.dailyAccounts.find();
		const fixed = await user.fixedAccounts.find();
		const term = await user.termAccounts.find();
		return { daily, fixed, term };
	},

	showData: async () => {
		const dataComplet = await dataService.getAllData();
		const term = dataComplet.term;

		const date = new Date();
		const mouth = date.getMonth();
		const year = date.getFullYear();

		console.log("Este é o dataDate => " + term[0].vencimento);

		for (i = 0; i < term.length; i++) {
			const date = term[i].vencimento.split("/");
			console.log(`${parseInt(date[1])}, ${parseInt(mouth)}, ${parseInt(date[2])}, ${parseInt(year)}`)
			if (parseInt(date[1]) === parseInt(mouth) && parseInt(date[2]) === parseInt(year)) {
				console.log(term[i].vencimento);
			}
		}
	},
};

module.exports = dataService;
