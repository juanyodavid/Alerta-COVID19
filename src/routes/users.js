const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin',(req,res) => {
    res.render('users/signin')
});
router.get('/users/signup',(req,res) => {
    res.render('users/signup')
});
router.post('/users/signin',passport.authenticate('local',{
    successRedirect: '/visita',
    failureRedirect: "/users/signin" ,
    failureFlash: true
}) );
router.post('/users/signup', async (req, res) => {
    const {email,password,password_confirm,name,celular} = req.body; 
    const errors = [];
    if(password != password_confirm){
        errors.push({text: "Las contraseñas no coinciden. "});
    }
    if(password.length < 3 ){
        errors.push({text: "La contraseña debe tener al menos 4 caracteres. "});
    }
    if(errors.length > 0 ){
        res.render('users/signup',{errors, email,password,password_confirm,name,celular});
    }
    else{
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('error_msg','Este email ya esta registrado.');
            res.redirect('/users/signup');
        }else{
            const newUser = new User({email,password,name,celular});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg','Ha sido registrado correctamente');
            res.redirect('/users/signin');
        }
    }
});
router.get('/users/logout',(req,res) => {
    req.logOut();
    res.redirect('/');
});
module.exports = router; 