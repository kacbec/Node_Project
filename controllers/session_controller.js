var ClientModel = require('../models/client_model').ClientModel;

// Someone tries to login
exports.login = function(io, socket, data) {
	
	console.log(data);
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
		
		
		
		if (!doc) {
			console.warn('nblad loginu?', data.nickname);

			socket.emit('login error', {
				message: 'nickname in use'
			});
			return;
		}
		
		if ( doc.pass == data.pass ){
			socket.emit('login ok', {
				nickname: data.nickname
			});

			exports.clients(io, socket);
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
		// Oops...
		if (err) {
			socket.emit('error', {
				message: 'error reading clients list'
			});
			return;
		}

		// Duplicated nickname :(
		if (doc) {
			console.warn('nickname in use, orphan records?', doc.nickname);

			socket.emit('login error', {
				message: 'nickname in use'
			});
			return;
		}

		// So far, so good! Save new client for future references
		var client = new ClientModel();

		client.nickname = data.nickname;
		client.pass = data.pass;
		client.socket_id = socket.id;
		client.xp = '0';
		client.hp = '20';
		client.pos = '' + Math.floor((Math.random()*100)+1) + ':' +Math.floor((Math.random()*100)+1);

		client.save(function() {
				socket.emit('reg ok', {
					nickname: data.nickname,
					hp: client.xp,
					xp: client.hp,
					pos: client.pos,
					
				});

			// And finally, broadcas a clients update
			exports.clients(io, socket);
		});
	});
}


// Someone is manually login out
exports.logout = function(io, socket, data) {
	// Reuse ;) disconnect
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

// Oops, disconnected!
exports.disconnect = function(io, socket, data) {
	// Who was she?
	ClientModel.findOne({
		socket_id: socket.id
	}, function(err, doc) {
		// Oops...
		if (err) {
			socket.emit('error', {
				message: 'error reading clients list'
			});
			return;
		}

		// OMG! A ghost!
		if (!doc) {
			socket.emit('logout error', {
				message: 'client not found'
			});
			return;
		}

		// Remove the client from DB to release the nickname
		socket.emit('logout ok');
		

		// Broadcast current clients
		exports.clients(io, socket);
	});
}
