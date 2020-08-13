const io = require('socket.io')(3000)

const users = {}
const {
    addData,
    userLeave,
    getUsers,
    getCurrentUser
  } = require('./user');
//all sockets have unique id that is why using as key here
io.on('connection', socket => {
    socket.on('new-user',  obj=> {
        
        users[socket.id] = obj.name

        const user = addData(socket.id,obj.name,obj.room)
        const res = getUsers(user.room)
        socket.join(user.room)


        console.log(res)
        socket.broadcast.to(user.room).emit('user-connected',user.name)
        io.to(user.room).emit('online',{
            room:user.room,
            arr:res
        })
    })
    socket.on('send-chat-message', msg=>{
        const user = getCurrentUser(socket.id);
        socket.to(user.room).emit('chat-message',{msg:msg,name:users[socket.id]})
    })
    socket.on('disconnect', () => {
        var user = getCurrentUser(socket.id);
        socket.to(user.room).emit('user-disconnected',users[socket.id])
        userLeave(socket.id)       
        const data = getUsers(user.room)
        console.log(data)
        socket.to(user.room).emit('online',{
            room:user.room,
            arr:data
        })
        delete users[socket.id]
    })

    io.emit('online',getUsers())
})