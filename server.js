const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')
const server = http.createServer(app)
const io = new Server(server)
const PORT = process.env.PORT || 3075
let myVideourl = ""

app.get('/',(req,res) => {
    res.sendFile(__dirname + "/index.html")
})

app.use(express.static(__dirname + '/'));

console.log(__dirname);

app.use("/video", express.static(__dirname + "/video"))


io.on('connection',(socket) => {
    var clientIp = socket.request.connection.remoteAddress;
    console.log('New connection from ' + clientIp);

    socket.on('image',(data) => {
        console.log(data)
        let finaldata = "/video/"+data;
        //myVideourl = finaldata;
        io.sockets.emit('image',finaldata);
      
    })
    
    socket.on('videoUploaded',(data) => {
        console.log(data)
        let finaldata = "/video/"+data;
        //myVideourl = finaldata;
        io.sockets.emit('videoUploaded',finaldata);
      
    })

    socket.on('chat message',(data) => {
        console.log(data)
        io.sockets.emit('chat message',data);
      
    })

    socket.on('liveBroadcast',(data) => {
        
        io.sockets.emit('liveBroadcast',data);
        console.log(data)
      
    })

    //socket.emit('oldimage',myVideourl);


    socket.on('disconnect',() => {
        //console.log(socket.id +' user disconnected')
        var clientIp = socket.request.connection.remoteAddress;
        //console.log('Disconnected ' + clientIp);
    })
})

server.listen(PORT,() => {
    console.log("Azaadi ka Amrit Mahotsav - Listening on Port **75")
})