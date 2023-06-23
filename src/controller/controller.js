const model = require("../models/model");
const general = require("../config/general")

const init = (req, res) => {
	res.render("index");
};

const saveData = (req, res) => {
	const form = req.body;
	const choice = req.params.choice;

	const f_account = new model.fixedAccounts(form);
	const t_Account = new model.termAccounts(form);
	const d_Account = new model.dailyAccounts(form);

	if (choice == "fixedAccount") {
		general.sendData(f_account);
	} else if (choice == "termAccount") {
		general.sendData(t_Account);
	} else {
		general.sendData(d_Account);
	}

  res.redirect("/");
};

module.exports = {
	init,
	saveData,
};
