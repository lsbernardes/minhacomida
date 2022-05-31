const express = require('express');
const morgan = require('morgan');

const routes = require('./routes/routes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/receitas', routes);

module.exports = app;
