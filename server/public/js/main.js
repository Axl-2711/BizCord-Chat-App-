const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

// console.log(username, room)

const socket = io()

// Join chatroom
socket.emit('joinRoom', { username, room })

// Get room users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room)
    outputUsers(users)
})

// Output message
socket.on('message', (message) => {
    outputMessage(message)

    // Auto Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight
})

// Send message
chatForm.addEventListener('submit', (e) => {

    // handling explicitly
    e.preventDefault()

    // Get message text
    const msg = e.target.elements.msg.value

    // Emit message
    socket.emit('chatMessage', msg)

    // Clear input
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})


// Output message to DOM
const outputMessage = (message) => {
    console.log(message)
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
						<p class="text">
							${message.text}
						</p>`
    document.querySelector('.chat-messages').appendChild(div)
}

// Add room name to DOM
const outputRoomName = (room) => {
    roomName.innerText = room
}

// Add users to DOM
const outputUsers = (users) => {
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `
}