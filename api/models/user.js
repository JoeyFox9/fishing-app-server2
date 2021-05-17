const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: { type: String, required: true},
	password: {type: String, required: true},
	catches: {
		location: {lat:{type: Number}, lng:{type: Number}},
		note: String,
		weather: String,
		temp: Number,
		date: Date
		
	}
 
});

module.exports = mongoose.model('User', userSchema);

//References:
//https://www.youtube.com/playlist?list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q

