const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const routes = require('./routes/routes');

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/receita', routes);

module.exports = app;
