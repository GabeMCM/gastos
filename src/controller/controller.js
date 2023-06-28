const model = require("../models/model");
const general = require("../config/general")

const init = (req, res) => {
  res.render("index");
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

const saveData = (req, res) => {
  const form = req.body;
  const choice = req.params.choice;

  const f_account = new model.fixedAccounts(form);
  const t_Account = new model.termAccounts(form);
  const d_Account = new model.dailyAccounts(form);

  if (choice == "fixedAccount") {
    sendData(f_account);
  } else if (choice == "termAccount") {
    sendData(t_Account);
  } else {
    sendData(d_Account);
  }

  res.redirect("/");
};

module.exports = {
  init,
  saveData,
};
