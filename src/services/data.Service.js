const user = require("../models/model");
const { all } = require("../routes/routes");

const dataService = {
	sendData: async (collection) => {
		//Envia e salva os dados para cada collection dentro do banco de dados.
		await collection
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
		const fixed = await dataComplet.fixed;
		const daily = await dataComplet.daily;
		const termBeforeFilter = dataComplet.term;

		const date = new Date();
		const mouth = date.getMonth() + 1;
		const year = date.getFullYear();
		let term = [];

		for (i = 0; i < termBeforeFilter.length; i++) {
			const date = termBeforeFilter[i].vencimento.split("/");
			if (
				parseInt(date[1]) === parseInt(mouth) &&
				parseInt(date[2]) === parseInt(year)
			) {
				term.push({
					descricao: termBeforeFilter[i].descricao,
					vencimento: termBeforeFilter[i].vencimento,
					valor: termBeforeFilter[i].valor,
					quantParcelas: termBeforeFilter[i].quantParcelas,
				});
			}
		}
		return { daily, fixed, term };
	},

	processingDate: (form, choice) => {
		const date = form.vencimento.split("-");
		const day = date[2];
		const mounth = date[1];
		const year = date[0];
		let dateProcessed = "";
		if (choice === "year") {
			if (mounth.length === 1 || day.length === 1) {
				dateProcessed = `0${day}/0${mounth}/${year}`;
			} else if (mounth.length === 1) {
				dateProcessed = `${day}/0${mounth}/${year}`;
			} else if (day.length === 1) {
				dateProcessed = `0${day}/${mounth}/${year}`;
			} else {
				dateProcessed = `${day}/${mounth}/${year}`;
			}
		} else {
			if (mounth.length === 1 || day.length === 1) {
				dateProcessed = `0${day}/0${mounth}`;
			} else if (mounth.length === 1) {
				dateProcessed = `${day}/0${mounth}`;
			} else if (day.length === 1) {
				dateProcessed = `0${day}/${mounth}`;
			} else {
				dateProcessed = `${day}/${mounth}`;
			}
		}
		form.vencimento = dateProcessed;
	},
};

module.exports = dataService;
