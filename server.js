const io = require('socket.io')(3000)

const users = {}
var user = []
//all sockets have unique id that is why using as key here
io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected',name)
        // user = [...user,name]
        // console.log(user)
        io.emit('online',name)   //to everyone
        // socket.broadcast.emit('online',name)
    })
    socket.on('send-chat-message', msg=>{
        socket.broadcast.emit('chat-message',{msg:msg,name:users[socket.id]})
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected',users[socket.id])
        delete users[socket.id]
    })
    // socket.on('user-online',name=>{
    //     socket.broadcast.emit('online',name)   //to every other except itself
    //     socket.emit('online',name)   //to single client 
    // })
})