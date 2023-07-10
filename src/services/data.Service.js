const user = require("../models/model");

const dataHandler = {
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
};

module.exports = dataHandler;
