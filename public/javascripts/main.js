$(function() {
	var socket = io.connect('http://' + window.location.hostname + ':' + window.location.port);

	socket.on('login ok', function(data) {
			$('.login-form').hide();
			$('.logout-form').show();
			$('.nickname-display').text(data.nickname);
			$('#map').addClass('show');
			console.log('loged');
			
		});
		
	socket.on('login error', function(data) {
			alert(data.message);
		});
		
	socket.on('logout ok', function(data) {
			$('.logout-form').hide();
			$('.login-form').show();
		
		});
	
	socket.on('reg ok', function(data) {
			$('.login-form').hide();
			$('.logout-form').show();
			$('.nickname-display').text(data.nickname);
			$('#hp span').text(data.hp);
			$('#xp span').text(data.xp);
			$('#pos span').text(data.pos);
			
						
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
		socket.emit('logout attempt', {
			nickname: this.nickname
		});
		return false;
	});
	
	$('#reg').click(function() {
		console.log('aa');
		$('#regcont').addClass('show');
		return false;
	});
	
	$('.btn.register').click(function() {
		console.log('reg');
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
		this.nickname = $('.nickname-display').val();
		this.poz = $('#pos span').val();
				
		socket.emit('lgo_n', 
		{
			nickname: this.nickname,
			poz: this.poz
		});
		return false;
	});
	
	$('#go_s').click(function() {
		this.nickname = $('.nickname-display').val();
		this.poz = $('#pos span').val();
				
		socket.emit('lgo_s', 
		{
			nickname: this.nickname,
			poz: this.poz
		});
		return false;
	});
	
	$('#go_w').click(function() {
		this.nickname = $('.nickname-display').val();
		this.poz = $('#pos span').val();
				
		socket.emit('lgo_w', 
		{
			nickname: this.nickname,
			poz: this.poz
		});
		return false;
	});
	
	$('#go_e').click(function() {
		this.nickname = $('.nickname-display').val();
		this.poz = $('#pos span').val();
				
		socket.emit('lgo_e', 
		{
			nickname: this.nickname,
			poz: this.poz
		});
		return false;
	});
	


});
