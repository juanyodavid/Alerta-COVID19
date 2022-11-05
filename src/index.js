const express = require ('express');
const path = require('path');
const exphbs =  require('express-handlebars');
const methodOverrrite = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//Initializations
const app = express();
require('./database');
require('./config/passport');

// Settings
app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main', // por default todos tienen este layout como base
    layoutsDir: path.join(app.set('views'), 'layouts'),
    partialsDir: path.join(app.set('views'),'partials'),
    extname: '.hbs'
}));
app.set('view engine','.hbs');
// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverrrite('_method'));
app.use(session({
    secret: 'covidsec',// este sirve para el encode de la seguridad
    resave: true,
     saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// app.use(session(options));

// Global Variables
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user;

    next();
});

// app.use(function (req, res, next) {
//     res.locals.session = req.session;
//     next();
// });
// Routes
app.use(require('./routes/index'));
app.use(require('./routes/local'));
app.use(require('./routes/users'));
app.use(require('./routes/visita'));
app.use(require('./routes/resultado'));

// Static File List
app.use(express.static(path.join(__dirname,'public')));

// Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});