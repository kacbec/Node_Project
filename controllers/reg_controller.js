var ClientModel = require('../models/client_model').ClientModel;
var MessageModel = require('../models/reg_model').MessageModel;


exports.go_s = function(io, socket, data) {
	console.log('go s');
}

exports.newreg = function(io, socket, data) {
	var nreg = new ClientModel();

		nreg.nickname = data.nickname;
		nreg.pass = data.pass;
		nreg.socket_id = socket.id;
		nreg.xp = '0';
		nreg.hp = '20';
		nreg.pos = '' + Math.floor((Math.random()*100)+1) + ':' +Math.floor((Math.random()*100)+1);
		nreg.lev = 1;

		nreg.save(function() {
				socket.emit('reg ok', {
				nickname: data.nickname,
				hp: client.hp,
				xp: client.xp,
				pos: client.pos,
				lev: client.lev,
				islogin: false
			});
		})
}

exports.getreg = function(io, socket, data) {
	
	if (!data.nickname || !data.pass ) {
		socket.emit('login error', {
			message: 'no nickname provided'
		});
		return;
	}

	ClientModel.findOne({
		nickname: data.nickname
	}, function(err, doc) {
		if (err) {
			socket.emit('error', {
				message: 'error reading clients list'
			});
			return;
		}
	
	if (doc) {}
	else exports.newreg(io, socket, data);
	
});
}

