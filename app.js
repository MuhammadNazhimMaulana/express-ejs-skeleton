const express = require('express');
const expressLayouts = require('express-ejs-layouts');

// Env
require('dotenv').config()

// Connextion
require('./utils/db');

// User Model
const User = require('./models/User');

const app = express();
const port = process.env.PORT;

// Setup ejs
app.set('view engine', 'ejs');

// Menggunakan ejs-layouts (Third party Middleware)
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Seperate Route
const route = require('./routes/route');
app.use('/', route);

app.listen(port, () => {
    console.log(`Jalan di http://localhost:${port}`);
});