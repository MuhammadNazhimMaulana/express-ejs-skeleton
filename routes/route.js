const express = require('express');
const router = express.Router();

// Halaman Home
router.get('/', (req, res) => {
    res.render('home', {
        layout: 'layouts/main',
        title: 'Halaman Home'
    });
});

// Halaman About
router.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main',
        title: 'Halaman About'
    });
});

module.exports = router;