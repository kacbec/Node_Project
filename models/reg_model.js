var mongoose = require('mongoose');

exports.regSchema = new mongoose.Schema({
	_id: mongoose.Schema.ObjectId,
	pos: '',
	color: '',
	level: '',
	defeat: Boolean
});

exports.regModel = mongoose.model('reg', exports.regSchema);
