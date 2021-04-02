const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:123@cluster0.efi0m.mongodb.net/Fishing_App?retryWrites=true&w=majority',function(){console.log(mongoose.connection.readyState);});
console.log(mongoose.connection.readyState);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	if(req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

app.use((req, res, next) => {
	res.status(200).json({
		message: 'It works!!!!!'
	});
});

module.exports = app;