module.exports = function ({ name, image }) {
    const members = new Map()
    let chatHistory = []


    //메시지 중계
    function broadcastMessage(message) {
        members.forEach(m => m.emit('message', message))
    }

    function addEntry(entry) {
        chatHistory = chatHistory.concat(entry)
    }


    //채팅방 리스트 호출
    function getChatHistory() {
        return chatHistory.slice()
    }

    //유저추가
    function addUser(client) {
        members.set(client.id, client)
    }

    //유저삭제
    function removeUser(client) {
        members.delete(client.id)
    }


    //json 형태 시리얼
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
