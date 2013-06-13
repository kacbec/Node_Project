/**
 * Module dependencies.
 */
/*jshint node: true */
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , redis = require('redis');


var app = express(); 

app.configure(function () {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(app.router);
  
});  

var users = [];

var regions = [];

var addUser = function( UserName, UserPass, UserRegion) {
    
    var User = 
    {
		name: UserName,
		pass: UserPass,
		region: UserRegion,
		level: 1,
		xp: 0,
		hp: 10,
        state: 'alive'
    }
    users.push(user);
    
    db.hmset(UserName, "name", UserName, "pass", UserPass, "region", UserRegion, "level", 1, "xp", 0, "hp", 10, "State", "alive");
	
}

var getUserData = function( UserName ) {
	db.hgetall( UserName, function (err, obj) {
		 console.dir(obj);
	});
}

var updateUser = function( UserObj )
{
	db.hmset( UserObj.name, "name",UserObj.name , "pass", UserObj.pass, "region", region, "xp", UserObj.xp, "hp", UserObj.hp);
}

var newRegion = function(x,y, type, rlevel )
{
	
	var region =
	{
		pozx: x,
		pozy: y,
		terain : type,
		level: rlevel
	}
	
	regions.push(region);
    
    client.db(x+y, "pozx", x, "pozy", y, "terain", type, "level", rlevel);
}

var getRegionData = function( Region ) {
	return db.hgetall( Region, function (err, obj) {
		return obj;
	});
}


var FightResult = function( utemp, rtmp )
{
	utmp = utmp * (Math.floor((Math.random()*10)+1) / 2);
	rtmp = rtmp * (Math.floor((Math.random()*10)+1) / 2);
	
	if( utmp > rtmp )
		return 1;
	else if (utmp == rtmp) 
		return 0;
	else
		return -1;
} 
var Fight = function( UserName, RegionName )
{	
	UserData = getUserData( UserName );
	RegionData = getRegionData( RegionName );
	
	var xp = UserData.xp+ RegionData.level*10;
		
	var result = FightResult(UserData.level, RegionData.level);
	
	if ( result = 1)
		if (xp > UserData.level*1000) 
			updateUser(
				{ 
					name: UserData.name,
					pass: UserData.pass,
					region: UserData.region,
					level: UserData.level + 1,
					xp: xp - 1000,
					hp: UserData.hp + 5,
					state: 'alive'
				}
			);
	else if ( result = 0 )
		if (UserData.hp-1 != 0)
		updateUser(
			{ 
				name: UserData.name,
				pass: UserData.pass,
				region: UserData.region,
				level: UserData.level ,
				xp: UserData.xp,
				hp: UserData.hp-1,
				state: 'alive'
			}
		);	
		else 
			updateUser(
				{ 
					name: UserData.name,
					pass: UserData.pass,
					region: UserData.region,
					level: UserData.level ,
					xp: UserData.xp,
					hp: UserData.hp,
					state: 'dead'
				}
			);	
	else 
		updateUser(
			{ 
				name: UserData.name,
				pass: UserData.pass,
				region: UserData.region,
				level: UserData.level ,
				xp: UserData.xp,
				hp: UserData.hp,
				state: 'dead'
			}
		);	
}
var server = http.createServer(app).listen(app.get('port'), function () {
    console.log("Serwer nasłuchuje na porcie " + app.get('port'));
});

var io = require('socket.io');
var socket = io.listen(server);

var db = redis.createClient();



socket.on('connection', function (client) {
    'use strict';
    
	
	
    client.on('message', function (msg) {
        if (!username) {
            username = msg;
            client.send('Witaj ' + username + '!');
            client.broadcast.emit('message', 'Nowy użytkownik: ' + username);
            return;
        }
        
    });
});


socket.on('move', function (client) {
    'use strict';
    var username;
	
	
    client.on('move', function (move) {
        client.broadcast.emit('message', 'Player ' + username + ' moved to ' + move);
    });
});



app.post('/login', function (req, res) {
  var post = req.body;
  
  UserData = getUserData(post.user);
  
  if ( post.password == UserData.pass ) 
  {
    req.session.user_id = post.user;
    res.redirect('/Loged');
  } else {
    res.send('Bad user/pass');
  }
});

app.get('/', routes.index);

