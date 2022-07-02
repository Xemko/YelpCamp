module.exports.isLoggedIn = (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.flash('error', 'you should be signed in!')
        return res.redirect('/login')
    }
    next();
}

