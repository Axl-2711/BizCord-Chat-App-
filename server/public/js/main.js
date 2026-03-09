const chatForm = document.getElementById('chat-form')
const socket = io()

socket.on('message', (message) => {
    console.log(message)
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