const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')

// Env
require('dotenv').config()

// Connextion
require('./utils/db');

const app = express();
const port = process.env.PORT;

// Set up method override
app.use(methodOverride('_method'));

// Setup ejs
app.set('view engine', 'ejs');

// Menggunakan ejs-layouts (Third party Middleware)
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// For Flash message
const session = require('express-session');
const flash = require('connect-flash');

// For Cookie
const cookieParser = require('cookie-parser');

// Konfigurasi Flash
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true
    })
);
app.use(flash());

// Seperate Route
const route = require('./routes/route');
const userRoute = require('./routes/user.route');
app.use('/', route);
app.use('/user', userRoute);

app.listen(port, () => {
    console.log(`Jalan di http://localhost:${port}`);
});

// Export the Express API
module.exports = app;