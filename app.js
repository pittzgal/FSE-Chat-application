var express=require('express'),
app=express(),
server=require('http').createServer(app),
io=require('socket.io').listen(server);

server.listen(3000);
app.get('/',function(req,res){
res.sendfile(__dirname+'/index.html');
});

io.sockets.on('connection', function (socket) {
    //when recieving the data from the server, push the same message to client.
    socket.on("clientMsg", function (data) {
        //send the data to the current client requested/sent.
        socket.emit("serverMsg", data);
        //send the data to all the clients who are acessing the same site(localhost)
        socket.broadcast.emit("serverMsg", data);
    });

    socket.on("sender", function (data) {
        socket.emit("sender", data);
        socket.broadcast.emit("sender", data);
    });
});
