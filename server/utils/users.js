const users = []

// Join user to chat
const userJoin = (id, username, room) => {
    const user = { id, username, room }
    users.push(user)
    return user
}

// Get connected user
const getConnectedUser = (id) => {
    return users.find(user => user.id === id)
} 

export {
    userJoin,
    getConnectedUser
}