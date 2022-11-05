const express = require("express");
const { route } = require(".");
const router = express.Router();

const { isAuthenticated } = require('../helpers/auth');


router.get('/resultado',isAuthenticated,(req,res)=>{
    res.send('estamos en resultado');
});

module.exports = router;
