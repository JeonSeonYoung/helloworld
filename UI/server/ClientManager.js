
//import ChatUser from "../src/layouts/ChatUser";

var userTemplates = this._callChatListApi()


//user 불러오기
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
        return <chatuser chatID={pData.chatID} cost={pData.maxCost} key={index} />
    })
    return lData
})



module.exports = function () {
    // mapping of all connected clients
    const clients = new Map()

    function addClient(client) {
        clients.set(client.id, { client })
    }

    function registerClient(client, user) {
        clients.set(client.id, { client, user })
    }

    function removeClient(client) {
        clients.delete(client.id)
    }

    function getAvailableUsers() {
        const usersTaken = new Set(
            Array.from(clients.values())
                .filter(c => c.user)
                .map(c => c.user.name)
        )
        return userTemplates
            .filter(u => !usersTaken.has(u.name))
    }

    function isUserAvailable(userName) {
        return getAvailableUsers().some(u => u.name === userName)
    }

    function getUserByName(userName) {
        return userTemplates.find(u => u.name === userName)
    }

    function getUserByClientId(clientId) {
        return (clients.get(clientId) || {}).user
    }

    return {
        addClient,
        registerClient,
        removeClient,
        getAvailableUsers,
        isUserAvailable,
        getUserByName,
        getUserByClientId
    }
}
