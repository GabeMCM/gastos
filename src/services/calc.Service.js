const calcCount = (description, initialDate, valor, installments) => {
	let monthList = [];
	let installmentsList = [];
	const dateParts = initialDate.toString().split("/"); // Divide a string em partes

	let day = parseInt(dateParts[0])
	let mounth = parseInt(dateParts[1]) - 1; // Mês começa em 0 (janeiro = 0)
	let year = parseInt(dateParts[2]);

	const date = new Date(year, mounth);
	const installmentsValor = valor / installments;

	for (let i = 0; i < installments; i++) {
		mounth = date.getMonth() + 1; // Mês atual (começando em 0)
		year = date.getFullYear();
		monthList.push(`${day}/${mounth}/${year}`);
		installmentsList.push(`${i+1} de ${installments}`)
		date.setMonth(date.getMonth() + 1); // Avança para o próximo mês
	}

	return {description, monthList, installmentsValor, installmentsList };
};

module.exports = {
	calcCount,
};
