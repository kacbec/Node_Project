$(function() {
	var socket = io.connect('http://' + window.location.hostname + ':' + window.location.port);

	socket.on('login ok', function(data) {
			$('.login-form').hide();
			$('.logout-form').show();
			$('.nickname-display').text(data.nickname);
			$('#hp span').text(data.hp);
			$('#xp span').text(data.xp);
			$('#pos span').text(data.pos);
			$('#lev span').text(data.lev);
						
			$('#regcont').removeClass('show');
			$('#map').addClass('show');
		});
		
	socket.on('login error', function(data) {
			alert(data.message);
		});
		
	socket.on('error', function(data) {
		alert(data.message);
	});
		
	socket.on('logout ok', function(data) {
			$('.logout-form').hide();
			$('.login-form').show();
			
			$('#map').removeClass('show');
			
			var log = $('#gamelog ul+ul');
			log.empty();
		});
	
	socket.on('reg ok', function(data) {
			$('.login-form').hide();
			$('.logout-form').show();
			$('.nickname-display').text(data.nickname);
			$('#hp span').text(data.hp);
			$('#xp span').text(data.xp);
			$('#pos span').text(data.pos);
			$('#lev span').text(data.lev);
						
			$('#regcont').removeClass('show');
			$('#map').addClass('show');
			
		});
	
	$('.btn.login').click(function() {
		console.log('aa');
	
		this.nickname = $('#nickname').val();
		this.pass = $('#pass').val();
		
		socket.emit('login attempt', 
		{
			nickname: this.nickname,
			pass: this.pass
		});
		return false;
	});
	
	
	$('.btn.logout').click(function() {
		this.nickname = $('.nickname-display').text();
		socket.emit('logout attempt', {
			nickname: this.nickname
		});
		return false;
	});
	
	$('#reg').click(function() {
		$('#regcont').addClass('show');
		$('.login-form').hide();
		return false;
	});
	
	$('#log').click(function() {
		$('#regcont').removeClass('show');
		$('.login-form').show();
		return false;
	});
	
	$('.btn.register').click(function() {
		
		this.nickname = $('#nickname1').val();
		this.pass = $('#pass1').val();
		
		socket.emit('reg attempt', 
		{
			nickname: this.nickname,
			pass: this.pass
		});
		
		return false;
	});
	
	
	$('#go_n').click(function() {
		this.nickname = $('.nickname-display').text();
		this.poz = $('#pos span').text();
				
		socket.emit('go_n', 
		{
			nickname: this.nickname,
			pos: this.poz
		});
		return false;
	});
	
	$('#go_s').click(function() {
		
		this.nickname = $('.nickname-display').text();
		this.poz = $('#pos span').text();
				
		socket.emit('go_s', 
		{
			nickname: this.nickname,
			pos: this.poz
		});
		return false;
	});
	
	$('#go_w').click(function() {
		this.nickname = $('.nickname-display').text();
		this.poz = $('#pos span').text();
				
		socket.emit('go_w', 
		{
			nickname: this.nickname,
			pos: this.poz
		});
		return false;
	});
	
	$('#go_e').click(function() {
		this.nickname = $('.nickname-display').text();
		this.poz = $('#pos span').text();
				
		socket.emit('go_e', 
		{
			nickname: this.nickname,
			pos: this.poz
		});
		return false;
	});
	
	$('#walcz').click(function() {
		this.nickname = $('.nickname-display').text();
		this.poz = $('#pos span').text();
				
		socket.emit('walcz', 
		{
			nickname: this.nickname,
			pos: this.poz
		});
		return false;
	});
	
	
	socket.on('moveto', function(data){
		console.log(data);
		$('#pos span').text(data.pos);
		$('.mapa').css('background-color', data.color);
		var log = $('#gamelog ul+ul');
		log.append('<li>Ruszyłeś się na' + data.pos + '</li>');
	});
	
	socket.on('clients', 
		function(data){
		
		var log = $('#gamelog ul:first-child');
		
		log.empty();
		log.append('<li> Ilość zarejestrowanych grczy: ' + data.clients.length + '</li>Obecni:');
		for (var key in data.clients) {
			if(data.clients[key].islogin)
				log.append('<li>' + data.clients[key].nickname + '</li>');
		}
		
	});
	
	socket.on('win', function(data) {
			$('#xp span').text(data.xp);
			$('#lev span').text(data.lev);
			var log = $('#gamelog ul+ul');
			log.append('<li>Wygrałeś walkę </li>');		
		
		});
	socket.on('draw', function(data) {
			
			var log = $('#gamelog ul+ul');
			log.append('<li>Zremisowałes walkę </li>');		
			
		});

	socket.on('lose', function(data) {
			
			var log = $('#gamelog ul+ul');
			log.append('<li>Przegrałęs walkę </li>');		
			
		});
});
