const calcService = require("../services/calc.Service");

const filterService = {
	filterCurrentDueData: (form) => {
    let formObject = []

		const Object = calcService.calcCount(
			form.descricao,
			form.vencimento,
			form.valor,
			form.quantParcelas
		);

		for (let i = 0; i < Object.monthList.length; i++) {
			formObject.push({
				descricao: Object.description,
				vencimento: Object.monthList[i],
				valor: Object.installmentsValor,
				quantParcelas: Object.installmentsList[i],
			});
		}

    return formObject
	},
};

module.exports = filterService;