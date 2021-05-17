const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { json } = require("body-parser");


router.post('/signup', (req, res, next) => {
	User.find({email: req.body.email})
		.exec()
		.then(user => {
			console.log("here")
			if (user.length >= 1){
				return res.status(409).json({
					message: 'An account with this email address already exists'
				});
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) =>{
					if (err){
						return res.status(500).json({
							error: err	
						});
					} else {
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							email: req.body.email,
							password: hash
						});
						user
						.save()
						.then(result => {
							console.log()
							res.status(201).json({
								message: 'User created'
							});
						})
						.catch(err => {
							console.log(err);
							res.status(500).json({
								error: err
							});
						});
					}
				});
			}
		})					
});

router.post('/login', (req, res, next) => {

    User.find({email: req.body.email})
    .exec()
    .then(user => {
		console.log("inside login on server")
		console.log(req.body.email)

        if (user.length < 1){
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
            if(err){ 
				return res.status(401).json({ message: 'Auth failed' });
			}

            if(result){
				const token = jwt.sign(
					{
						email: user[0].email,
						userId: user[0]._id
					}, "secret",
					{
						expiresIn: "1h"
					}
				);
                return res.status(200).json({
					username: req.body.email,
					user: user[0],
                    message: 'Auth successful',
					token: token
                });
            }
		});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
    )
})

router.delete('/:userId', (req, res, next) => {
	User.remove({_id: req.params.userId})
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'User deleted'
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

module.exports = router;

//References:
//https://www.youtube.com/playlist?list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q