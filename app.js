// app.js
const express = require('express');
const morgan = require('morgan');

const skiRoutes = require('./routes/ski');
const authRoutes = require('./routes/auth');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/skis', skiRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
