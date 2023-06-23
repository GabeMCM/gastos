const calcCount = (initialDate, valor, installments) => {
	const monthList = [];
	const dateParts = initialDate.split("/"); // Divide a string em partes

	let mounth = parseInt(dateParts[1]) - 1; // Mês começa em 0 (janeiro = 0)
	let year = parseInt(dateParts[2]);

	const date = new Date(year, mounth);
	const installmentsValor = valor / installments;

	for (let i = 0; i < installments; i++) {
		mounth = date.getMonth() + 1; // Mês atual (começando em 0)
		year = date.getFullYear();
		monthList.push(`${mounth}/${year}`);
		date.setMonth(date.getMonth() + 1); // Avança para o próximo mês
	}

	return { monthList, installmentsValor };
};

const sendData = (collection) => {
	collection
		.save()
		.then(() => {
			console.log("Dados salvos corretamente");
		})
		.catch((error) => {
			console.error("Erro ao salvar:", error);
		});
};

module.exports = {
	calcCount,
	sendData,
};
