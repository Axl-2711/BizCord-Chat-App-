const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')

const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

// console.log(username, room)

const socket = io()

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