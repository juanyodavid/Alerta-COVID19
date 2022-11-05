const helpers = {};

helpers.isAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    else
    {
        req.flash('error_msg','No autorizado, necesita iniciar sesión o registrarse');
        res.redirect('/users/signin');
    }
};

module.exports = helpers;