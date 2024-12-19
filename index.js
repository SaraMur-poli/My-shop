const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const session = require('express-session');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const path = require('path');  

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

app.set('views', path.join(__dirname, 'public', 'views'));
app.set('view engine', 'ejs');


var user = require('./routers/user');
app.use('/user', user)

var product = require('./routers/product');
app.use('/product', product)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));