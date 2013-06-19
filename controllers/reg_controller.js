var ClientModel = require('../models/client_model').ClientModel;
var RegModel = require('../models/reg_model').regModel;

var FightResult = function( utmp, rtmp )
{
	console.log( utmp +'  '+ rtmp);
	if (utmp == 1)
		utmp = utmp * (Math.floor((Math.random()*10)+1) );
	else
		utmp = utmp * (Math.floor((Math.random()*10)+1) / 2);	
	rtmp = rtmp * (Math.floor((Math.random()*10)+1) / 3);
	
	console.log( utmp +'  '+ rtmp);
	if( utmp > rtmp )
		return 1;
	else if (utmp == rtmp) 
		return 0;
	else
		return -1;
} 


exports.go_s = function(io, socket, data) {
	
	var pozition = data.pos.split(':');
	data.pos = pozition[0]+':'+ (parseInt( pozition[1])-1);

	ClientModel.findOne({
		nickname: data.nickname
	}, function(err, doc) {
		if (err) {
			return;
		}

		if (doc) {
			doc.pos = data.pos;
			doc.save();
		}
	});
	
	RegModel.findOne({
		pos: data.pos
	}, function(err, doc) {
		if (err) {
			return -1;
		}
	
		if (!doc) 
		{
			var nreg = new RegModel();
			if( !data.pos )	
				nreg.pos = '' + Math.floor((Math.random()*100)+1) + ':' +Math.floor((Math.random()*100)+1);
			else 
				nreg.pos = data.pos;
				nreg.level =  '' + Math.floor((Math.random()*10)+1);
				nreg.defeat = false;
				nreg.color ='blue';
				nreg.save();
			
			socket.emit('moveto', {
					pos : nreg.pos,
					color: nreg.color
				});
		}
		else{
		socket.emit('moveto', {
				pos : doc.pos,
				color: doc.color
			});
		
		}
	});
	
		
}

exports.go_e = function(io, socket, data) {
	
	var pozition = data.pos.split(':');
	data.pos = (parseInt( pozition[0])-1)+':'+ pozition[1];

	ClientModel.findOne({
		nickname: data.nickname
	}, function(err, doc) {
		if (err) {
			return;
		}

		if (doc) {
			doc.pos = data.pos;
			doc.save();
		}
	});
	
	RegModel.findOne({
		pos: data.pos
	}, function(err, doc) {
		if (err) {
			return -1;
		}
	
		if (!doc) 
		{
			var nreg = new RegModel();
			if( !data.pos )	
				nreg.pos = '' + Math.floor((Math.random()*100)+1) + ':' +Math.floor((Math.random()*100)+1);
			else 
				nreg.pos = data.pos;
				nreg.level =  '' + Math.floor((Math.random()*10)+1);
				nreg.defeat = false;
				nreg.color ='blue';
				nreg.save();
			
			socket.emit('moveto', {
					pos : nreg.pos,
					color: nreg.color
				});
		}
		else{
		socket.emit('moveto', {
				pos : doc.pos,
				color: doc.color
			});
		
		}
	});
	
		
}

exports.go_w = function(io, socket, data) {
	
	var pozition = data.pos.split(':');
	data.pos = (parseInt( pozition[0])+1)+':'+ pozition[1];

	ClientModel.findOne({
		nickname: data.nickname
	}, function(err, doc) {
		if (err) {
			return;
		}

		if (doc) {
			doc.pos = data.pos;
			doc.save();
		}
	});
	
	RegModel.findOne({
		pos: data.pos
	}, function(err, doc) {
		if (err) {
			return -1;
		}
	
		if (!doc) 
		{
			var nreg = new RegModel();
			if( !data.pos )	
				nreg.pos = '' + Math.floor((Math.random()*100)+1) + ':' +Math.floor((Math.random()*100)+1);
			else 
				nreg.pos = data.pos;
				nreg.level =  '' + Math.floor((Math.random()*10)+1);
				nreg.defeat = false;
				nreg.color ='blue';
				nreg.save();
			
			socket.emit('moveto', {
					pos : nreg.pos,
					color: nreg.color
				});
		}
		else{
		socket.emit('moveto', {
				pos : doc.pos,
				color: doc.color
			});
		
		}
	});
	
		
}

exports.go_n = function(io, socket, data) {
	
	var pozition = data.pos.split(':');
	data.pos = pozition[0]+':'+ (parseInt( pozition[1])+1);

	ClientModel.findOne({
		nickname: data.nickname
	}, function(err, doc) {
		if (err) {
			return;
		}

		if (doc) {
			doc.pos = data.pos;
			doc.save();
		}
	});
	
	RegModel.findOne({
		pos: data.pos
	}, function(err, doc) {
		if (err) {
			return -1;
		}
	
		if (!doc) 
		{
			var nreg = new RegModel();
			if( !data.pos )	
				nreg.pos = '' + Math.floor((Math.random()*100)+1) + ':' +Math.floor((Math.random()*100)+1);
			else 
				nreg.pos = data.pos;
				nreg.level =  '' + Math.floor((Math.random()*10)+1);
				nreg.defeat = false;
				nreg.color ='blue';
				nreg.save();
			
			socket.emit('moveto', {
					pos : nreg.pos,
					color: nreg.color
				});
		}
		else{
		socket.emit('moveto', {
				pos : doc.pos,
				color: doc.color
			});
		
		}
	});
	
		
}

exports.newreg = function( data ) {
	var nreg = new RegModel();
		
	if( !data.pos )	
		nreg.pos = '' + Math.floor((Math.random()*100)+1) + ':' +Math.floor((Math.random()*100)+1);
	else 
		nreg.pos = data.pos;
		
		nreg.lev =  '' + Math.floor((Math.random()*10)+1);

		nreg.save();
		console.log('new' + nreg);
		
	return nreg;
}

exports.getreg = function( data ) {
	
	ClientModel.findOne({
		pos: data.pos
	}, function(err, doc) {
		if (err) {
			return -1;
		}
	
	
		if (!doc) 
			doc = exports.newreg(data);
		
		return doc;
	});
}


exports.walcz = function(io, socket, data) {
	
	RegModel.findOne({
		pos: data.pos
	}, function(err, doc) {
		if (err) {
			return -1;
		}
	
		if (doc) 
		{
			var reg = doc;
				ClientModel.findOne({
					nickname: data.nickname
				}, function(err, doc) {
					if (err) {
						return;
					}

					if (doc) {
						
						var xp = parseInt(doc.xp) + parseInt(doc.lev)*100;
								
						var result = FightResult(doc.lev, reg.level);
							
						if (result == 1){
							doc.xp = xp;
							if (doc.lev*1000<xp)
								doc.lev = doc.lev+1;
							socket.emit('win', {
								lev : doc.lev+1,
								xp: xp
							});	
								
						}	
						if (result == 0 )
							socket.emit('draw', {
								mes: 'Remis'
							});	
							
						if (result == -1 )
							socket.emit('lose', {
								mes: 'Przegrałeś'
							});	
					doc.save();
				}
				else{
					socket.emit('error', {
						message: 'wystąpił bład'
					});
				
				}
			});
		}
		else 
			socket.emit('error', {
						message: 'wystąpił bład'
					});
	});
	
	
	
		
}

