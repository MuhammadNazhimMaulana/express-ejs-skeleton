const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController')

const homeController = new HomeController()

// Halaman Home
router.get('/', homeController.index)

// // Halaman About
router.get('/about', homeController.about)

module.exports = router;