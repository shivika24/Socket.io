const socket = io('http://localhost:3000')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')
const userList = document.getElementById('users')
const roomName = document.getElementById('room-name');


const params = new URL(location.href).searchParams;
const name = params.get('username');
const room = params.get('room')

appendMsg('you Joined')

// socket.emit('user-online',name)

socket.emit('new-user',{name,room})
socket.on('chat-message',data=>{
    appendMsg(`${data.name}: ${data.msg}`)
})

socket.on('user-connected',name=>{
    appendMsg(`${name} connected`)    
})
socket.on('online',({room,arr})=>{
    outputRoomName(room);
    if(arr)
    appendList(arr)
    
})

socket.on('user-disconnected',name=>{
    appendMsg(`${name} disconnected`)
})

messageForm.addEventListener('submit',e=>{
    e.preventDefault();
    const msg = messageInput.value
    appendMsg(`You: ${msg}`)
    socket.emit('send-chat-message',msg)
    messageInput.value = ""
})

function appendMsg(msg)
{
    const elem = document.createElement('div')
    elem.innerText = msg
    messageContainer.append(elem)
}
function appendList(users)
{
    userList.innerHTML = `
    ${users.map(user => `<li>${user.name}</li>`).join('')}
  `;
}

function outputRoomName(room) {
    roomName.innerText = room;
  }