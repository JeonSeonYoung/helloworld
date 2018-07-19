import React, { Component } from 'react';
import Message from "../layouts/Message";

class ChatList extends Component {

    state = {
  
    }

    // render 다음에 작동
    componentDidMount(){
        this._getChatLists()
    }

    _getChatLists = async () =>{
    const chatList = await this._callChatListApi();
    this.setState({
        chatList
    })
    }

    _callChatListApi = () => {
    return fetch('https://funk0a9a03.execute-api.ap-northeast-2.amazonaws.com/dev/getchatlist', {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({userID : '1'})
    }).then(lData => lData.json())
        .catch(error => console.log(error))
    }

    _roadingFun = (() =>{
        var lData = this.state.chatList.map((pData, index) =>{
            console.log(pData, index);
            return <Message chatName={pData.chatName} nickName={pData.masterNickName}
                            interest={pData.interestName} cost = {pData.maxCost}
                            key={index} chatKey={index}/>
        })
        return lData
    })


    handleClick = () => {
        console.log('show popup');
    }

    render() {
        return (
            <div className="p-t-30">
                <div className="message-box contact-box soo-card m-t-10">
                    <div className="message-widget contact-widget">
                        {
                            this.state.chatList ? this._roadingFun() : "Roading...."
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatList;
