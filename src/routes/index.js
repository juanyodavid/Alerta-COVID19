const router = require('express').Router();

router.get('/',(req,res) => {
    res.render('index.hbs');
});

router.get('/about',(req,res) => { //**cuando tengamos esta url tiene que dirigirnos a la url de abajo, o sea, tiene que enrutar */
    res.render('about.hbs');
});

module.exports = router; 