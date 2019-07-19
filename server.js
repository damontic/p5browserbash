const express = require('express');
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);
const spawn = require('child_process').spawn;
const sh = spawn('bash');

app.use(express.static('./'))

// subprocess events
sh.stdout.on('data', function(data) {
	io.emit('message', data);
});

sh.stderr.on('data', function(data) {
	io.emit('message', data);
});

// socket events
io.on('connection', function(client){

	client.on('message', function(data){
		if (data === "exit") {
			client.emit('message', Buffer.from("Bye!"));
			client.disconnect(true);
		} else {
			sh.stdin.write(data+"\n");
		}
		io.emit('message', Buffer.from("[david@s4n]$ " + data));
	});

});

// server
server.listen(8080, function(){
	console.log('server started');
})
