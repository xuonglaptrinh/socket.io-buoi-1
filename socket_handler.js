module.exports = function (httpServer){
	var io = require('socket.io').listen(httpServer, {
		origins: '*:*',
		transports: ['polling', 'websocket']
	});


	var crud = io.of('crud');

	var chat = io.of('chat');

	chat.use(function (socket, next){
		if(socket.request._query.auth == 'hehehe'){
			next();
		}else {
			next(new Error('Acesss denied !!!!!'));
		}
	});

	chat.on('connection', function (socket){
		console.log('User connected :' + socket.id);

		socket.on('send:username', function (data){
			console.log('New user: '+ data.username);

			socket.broadcast.emit('new:user', {username: data.username});
			socket.emit('hello:user');
		})

		socket.on('join:room', function (data){
			socket.join(data.room);
		})

		socket.on('send:message', function (data){
			
			socket.to(data.room).emit('new:message',data);
			
			/*console.log(chat.adapter.rooms);*/
		})
	});


	crud.on('connection', function (socket){
		console.log('User connect to namespace crud');
	});


};