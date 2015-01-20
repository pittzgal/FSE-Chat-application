var express=require('express'),
app=express(),
server=require('http').createServer(app),
io=require('socket.io').listen(server);
var name;
server.listen(3000);
app.get('/',function(req,res){
res.sendfile(__dirname+'/index.html');
});

io.sockets.on('connection', function (socket) {
    socket.on("clientMsg", function (data) {
       name=data.name;
       socket.emit("serverMsg", data);
       socket.broadcast.emit("serverMsg", data);
    });

	socket.on('disconnect', function(data){
	socket.broadcast.emit('left',name);
			
			});
});
