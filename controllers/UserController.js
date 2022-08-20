// User Model
const User = require('../models/User');
const { validationResult } = require('express-validator');
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

    // Create
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

    // Update
    update = async (req, res) => {

        // Getting user
        const user = await User.findOne({ _id: req.params._id });

        return res.render('User/updateUser', {
            layout: 'layouts/main',
            title: 'Halaman Ubah Pengguna',
            user
        });
    }

    updateProcess = (req, res) => {

        // Konstanta errors
        const errors = validationResult(req);
    
        // Kalau error
        if(!errors.isEmpty())
        {
            res.render('User/updateUser', {
                layout: 'layouts/main',
                title: 'Halaman Update User',
                errors: errors.array(),
                user: req.body
            });
    
        }else{
    
            // New Function for adding contact
            User.updateOne(
                {
                    _id: req.body._id
                },
                {
                    $set: {
                        username: req.body.username,
                        email: req.body.email,
                        phone: req.body.phone
                    }
                }
                ).then((result) => {
                // Sending flash Message
                req.flash('msg', 'Kontak Berhasil Diubah');
        
                // Redirect 
                res.redirect('/user');
            });
        }        
    }

}

module.exports = UserController