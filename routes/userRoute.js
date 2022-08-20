// Contoh CRUD Routing 
const express = require('express');
const { userValidationRules, validate } = require('../utils/validator')
const router = express.Router();
const UserController = require('../controllers/UserController')

const userController = new UserController()

// Halaman Index
router.get('/', userController.index)

// Halaman Tambah Pengguna
router.get('/add', userController.add)
router.post('/add', userValidationRules(), validate, userController.addProcess)

module.exports = router;