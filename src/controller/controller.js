const model = require("../models/model");

const init = (req, res) => {
	res.render("index");
};

const saveData = async (req, res) => {
	
  const form = req.body;
	const choice = await req.params.choice;

  if (choice == "fixedAccount") {

    console.log(choice);
    const f_account = new model.fixedAccounts(form);

    f_account.save()
      .then(f_account => {
        console.log('Usuário salvo:', f_account);
      })
      .catch(error => {
        console.error('Erro ao salvar usuário:', error);
      });

    res.redirect("/");
  
  } else if (choice == "termAccount") {

    console.log(choice);
    const t_Account = new model.termAccounts(form);

    t_Account.save()
      .then(t_Account => {
        console.log('Usuário salvo:', t_Account);
      })
      .catch(error => {
        console.error('Erro ao salvar usuário:', error);
      });
    res.redirect("/");

  } else {

    console.log(choice);
    const d_Account = new model.dailyAccounts(form);

    d_Account.save()
      .then(d_Account => {
        console.log('Usuário salvo:', d_Account);
      })
      .catch(error => {
        console.error('Erro ao salvar usuário:', error);
      });
    res.redirect("/");

  }
};

module.exports = {
	init,
	saveData,
};
