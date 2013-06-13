/*jshint node: true, browser: true, jquery: true */
/*global io: false */
$(document).ready(function () {
    'use strict';
    var socket = io.connect('http://localhost:3000');
    
    console.log('connecting…');

    socket.on('connect', function () {
        console.log('Połączony!');
    });

    socket.on('message', function (msg) {
        var data = msg.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        $('#log ul').append('<li>' + data + '</li>');
    });

    entry_el.keypress(function (event) {
        if (event.keyCode !== 13) {
            return;
        }
        var msg = entry_el.attr('value');
        if (msg) {
            socket.send(msg);
            entry_el.attr('value', '');
        }
    });
});
