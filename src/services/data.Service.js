const user = require("../models/model");

const dataHandler = {
	sendData: (collection) => {
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
		const dataList = await model.find();
		return dataList;
	},

	getAllData: async () => {
		const daily = await user.dailyAccounts.find();
		const fixed = await user.fixedAccounts.find();
		const term = await user.termAccounts.find();
		return { daily, fixed, term };
	},
};

module.exports = dataHandler;
