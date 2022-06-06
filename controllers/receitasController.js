const Receita = require('./../models/receitasModel');

exports.pegarReceitas = async (req, res) => {
  try {
    const receita = await Receita.find();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(201).json({
      status: 'success',
      data: {
        receita,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.adicionarReceita = async (req, res) => {
  try {
    // req.setHeader('Content-Type', 'application/json');
    console.log(req);
    const novaReceita = await Receita.create(req.body);
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.status(201).json({
      status: 'success',
      data: {
        receita: novaReceita,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
