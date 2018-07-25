const Chatroom = require('./Chatroom')
import Message from "../src/layouts/Message";

//방 번호 불러와야함


var chatList = this._getChatLists()


_getChatLists = async () => {
    const chatList = await this._callChatListApi();
    this.setState({
        chatList,
    })
}

//야 데이터구나 
_callChatListApi = () => {
    return fetch('https://funk0a9a03.execute-api.ap-northeast-2.amazonaws.com/dev/getsearchchatroom', {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({ userID: '1' })
    }).then(lData => lData.json())
        .catch(error => console.log(error))
}

_loadingFun = (() => {
    var lData = this.state.chatList.map((pData, index) => {
        return <Message chatID={pData.chatID} cost={pData.maxCost} key={index} />
    })
    return lData
})



module.exports = function () {
    // mapping of all available chatrooms
    const chatrooms = new Map(
        chatList.map(c => [
            c.chatID,
            Chatroom(c)
        ])
    )

    function removeClient(client) {
        chatrooms.forEach(c => c.removeUser(client))
    }

    function getChatroomByName(chatroomName) {
        return chatrooms.get(chatroomName)
    }

    function serializeChatrooms() {
        return Array.from(chatrooms.values()).map(c => c.serialize())
    }

    return {
        removeClient,
        getChatroomByName,
        serializeChatrooms
    }
}
