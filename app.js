
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , session = require('./controllers/session_controller')
  , reg = require('./controllers/reg_controller');


var app = module.exports = express();
var server = http.createServer(app);

var io = require("socket.io").listen(server);
var socket, players = [] ;	

mongoose.connect('mongodb://localhost/demo-chat');


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());  
app.use(express.session({ secret: 'dev' }));
app.use(express.methodOverride());
app.use(app.router);
app.engine('jade', require('jade').__express);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));


server.listen(app.get('port'), function(){
	console.log('Yup ,server started on 3000');
});


io.sockets.on('connection', function(socket) {
	
	session.clients(io, socket);
	
	socket.on('login attempt', function(data) {
		session.login(io, socket, data);
	});
	
	
	socket.on('reg attempt', function(data) {
		session.reg(io, socket, data);
	});

	
	socket.on('logout attempt', function(data) {
		session.logout(io, socket, data);
	});

	socket.on('disconnect', function(data) {
		session.disconnect(io, socket, data);
	});
	
	socket.on('go_e', function(data) {
		reg.go_e(io, socket, data);
	});
	socket.on('go_w', function(data) {
		reg.go_w(io, socket, data);
	});
	socket.on('go_s', function(data) {
		reg.go_s(io, socket, data);
	});
	socket.on('go_n', function(data) {
		reg.go_n(io, socket, data);
	});
	
	socket.on('walcz', function(data) {
		reg.walcz(io, socket, data);
	});
	
});
