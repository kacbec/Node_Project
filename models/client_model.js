var mongoose = require('mongoose');

exports.ClientSchema = new mongoose.Schema({
	_id: mongoose.Schema.ObjectId,
	socket_id: '',
	nickname: '',
	pass: '',
	lev: '',
	location: '',
	hp: '',
	xp: ''
});

exports.ClientModel = mongoose.model('clients', exports.ClientSchema);
