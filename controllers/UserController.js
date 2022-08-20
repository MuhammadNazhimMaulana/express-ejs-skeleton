const { body, validationResult, check } = require('express-validator');

// User Model
const User = require('../models/User');

class UserController{

    index = async (req, res) => {

        // Load Users
        const users = await User.find();

        return res.render('User/index', {
            layout: 'layouts/main',
            title: 'Halaman User',
            msg: req.flash('msg'),
            users
        });
    }

    add = (req, res) => {
        return res.render('User/addUser', {
            layout: 'layouts/main',
            title: 'Halaman Tambah Pengguna'
        });
    }

    addProcess = (req, res) => {
        
        // Konstanta errors
        const errors = validationResult(req);
    
        // Kalau error
        if(!errors.isEmpty())
        {
            res.render('User/addUser', {
                layout: 'layouts/main',
                title: 'Halaman Tambah User',
                errors: errors.array(),
            });
    
        }else{
    
            // New Function for adding contact
            User.insertMany(req.body, (error, result) => {
                // Sending flash Message
                req.flash('msg', 'Kontak Berhasil Ditambahkan');
        
                // Redirect 
                res.redirect('/user');
            });
        }        
    }

}

module.exports = UserController