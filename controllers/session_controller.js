var ClientModel = require('../models/client_model').ClientModel;

exports.login = function(io, socket, data) {
	
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
		
		
		
		if (doc) {
			if ( doc.pass != data.pass ){
					socket.emit('login error', {
					message: 'Wrong password'
				});
			}
			else {
				socket.emit('login ok', {
					nickname: data.nickname,
					hp: doc.hp,
					xp: doc.xp,
					pos: doc.pos,
					lev: doc.lev
				});
				
			
				doc.islogin = true;
				doc.save();
				exports.clients(io, socket);
			}
		}
		else {
			console.warn('blad loginu?', data.nickname);

			socket.emit('login error', {
				message: 'No such user'
			});
			return;
		}
		
		
		

	});
}

exports.reg = function(io, socket, data) {
	console.log(data);
	console.log('reg');
	// No nickname? Sorry
	if (!data.nickname || !data.pass ) {
		socket.emit('error', {
			message: 'no nickname provided'
		});
		return;
	}

	// Seach for duplicate nicknames
	ClientModel.findOne({
		nickname: data.nickname
	}, function(err, doc) {
		if (err) {
			socket.emit('error', {
				message: 'error reading clients list'
			});
			return;
		}

		if (doc) {
			console.warn('nickname in use', doc.nickname);

			socket.emit('login error', {
				message: 'Nickname in use'
			});
			return;
		}

		
		var client = new ClientModel();

		client.nickname = data.nickname;
		client.pass = data.pass;
		client.socket_id = socket.id;
		client.xp = '0';
		client.hp = '20';
		client.pos = '' + Math.floor((Math.random()*100)+1) + ':' +Math.floor((Math.random()*100)+1);
		client.lev = 1;
		client.islogin = false;
		
		client.save(function() {
				socket.emit('reg ok', {
					nickname: data.nickname,
					hp: client.hp,
					xp: client.xp,
					pos: client.pos,
					lev: client.lev,
					islogin: false
			});

			exports.clients(io, socket);
		});
	});
}

exports.logout = function(io, socket, data) {
	exports.disconnect(io, socket, data);
}

// Broadcast clients to the world
exports.clients = function(io, socket, data) {
	ClientModel.find({}, function(err, data) {
		io.sockets.emit('clients', {
			clients: data
		});
	});
}



exports.disconnect = function(io, socket, data) {
	
	console.log(data);
	ClientModel.findOne({
		nickname: data.nickname
	}, function(err, doc) {
		if (err) {
			socket.emit('error', {
				message: 'error reading clients list'
			});
			return;
		}
		

		if (!doc) {
			socket.emit('logout error', {
				message: 'client not found'
			});
			return;
		}
		
		doc.islogin = false;
		doc.save();

		socket.emit('logout ok');
		
		exports.clients(io, socket);
	});
}
