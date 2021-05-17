const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require('../models/user');
const { json } = require("body-parser");

router.post('/catches', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then( user => {        
        catches = user[0].catches;
        return res.status(200).json({"catches": catches});
    })
   
})

router.put('/addCatch', (req, res, next)=> {
    User.updateOne({email: req.body.email},
        {
            $push: {
                catches: req.body.catch
            }
        },
        function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.status(201).json({
                    message: 'Catch added'
                });
            }
        }
        
    )
})

module.exports = router;

//References:
//https://www.youtube.com/playlist?list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q