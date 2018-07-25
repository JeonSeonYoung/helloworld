module.exports = function ({ name, image }) {
    const members = new Map()
    let chatHistory = []


    //message
    function broadcastMessage(message) {
        members.forEach(m => m.emit('message', message))
    }

    function addEntry(entry) {
        chatHistory = chatHistory.concat(entry)
    }


    //history
    function getChatHistory() {
        return chatHistory.slice()
    }

    //user add
    function addUser(client) {
        members.set(client.id, client)
    }

    //user del
    function removeUser(client) {
        members.delete(client.id)
    }


    //json serial
    function serialize() {
        return {
            name,
            numMembers: members.size
        }
    }

    return {
        broadcastMessage,
        addEntry,
        getChatHistory,
        addUser,
        removeUser,
        serialize
    }
}
