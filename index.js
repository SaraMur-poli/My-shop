const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const session = require('express-session');

const app = express();

connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

//*****ROUTERS******//
app.use(session({
    secret: 'my_safe_chain',
    resave: false,
    saveUninitialized: true,
}));