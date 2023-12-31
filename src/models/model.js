const mongoose = require("mongoose");

const fixedAccountsSchema = new mongoose.Schema({
	vencimento: String,
	descricao: String,
	valor: Number,
});

const termAccountsSchema = new mongoose.Schema({
	vencimento: String,
	descricao: String,
	valor: Number,
	quantParcelas: String,
});

const dailyAccountsSchema = new mongoose.Schema({
  descricao: String,
  valor: Number,
})

const fixedAccounts = mongoose.model("fixedAccounts", fixedAccountsSchema);
const termAccounts = mongoose.model("termAccounts", termAccountsSchema);
const dailyAccounts = mongoose.model("dailyAccounts", dailyAccountsSchema);

module.exports = {
	termAccounts,
  fixedAccounts,
  dailyAccounts,
};
