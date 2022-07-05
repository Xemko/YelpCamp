const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const { nextTick } = require('process');

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password);
        req.flash('success', 'Welcome to Yelp Camp!');
        res.redirect('/campgrounds')
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('register')
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome Back Barbos tvoy nos')
    res.redirect('/campgrounds')
})

router.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) return next(err)
        req.flash('success', 'See ya barbos')
        res.redirect('/campgrounds')

    })

})

module.exports = router;