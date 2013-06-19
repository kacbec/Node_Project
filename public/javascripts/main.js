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
			console.log('loged');
			console.log(data);
		});
		
	socket.on('login error', function(data) {
			alert(data.message);
		});
		
	socket.on('logout ok', function(data) {
			$('.logout-form').hide();
			$('.login-form').show();
			
			$('#map').removeClass('show');
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
			console.log('registered');
			console.log(data);
			
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
				
		socket.emit('lgo_n', 
		{
			nickname: this.nickname,
			poz: this.poz
		});
		return false;
	});
	
	$('#go_s').click(function() {
		this.nickname = $('.nickname-display').text();
		this.poz = $('#pos span').text();
				
		socket.emit('lgo_s', 
		{
			nickname: this.nickname,
			poz: this.poz
		});
		return false;
	});
	
	$('#go_w').click(function() {
		this.nickname = $('.nickname-display').text();
		this.poz = $('#pos span').text();
				
		socket.emit('lgo_w', 
		{
			nickname: this.nickname,
			poz: this.poz
		});
		return false;
	});
	
	$('#go_e').click(function() {
		this.nickname = $('.nickname-display').text();
		this.poz = $('#pos span').text();
				
		socket.emit('lgo_e', 
		{
			nickname: this.nickname,
			poz: this.poz
		});
		return false;
	});
	
	
	
	
	socket.on('clients', 
		function(data){
		
		var log = $('#gamelog ul');
		
		
		
		console.log(data);
		log.empty();
		log.append('<li> Ilość zarejestrowanych grczy: ' + data.clients.length + '</li>');
		for (var key in data.clients) {
			if(data.clients[key].islogin)
				log.append('<li>' + data.clients[key].nickname + '</li>');
		}
		
	});


});
