const mongoose = require('mongoose');

const receitasSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Uma receita precisa ter um nome'],
    unique: true,
    // trim: true,
  },
  data: {
    type: [Date],
    required: [true, 'Uma receita precisa ter um nome'],
  },
  comentario: String,
});

const Receita = mongoose.model('Receita', receitasSchema);
module.exports = Receita;
