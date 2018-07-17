import React, { Component } from 'react';
import LinkButton from "../layouts/LinkButton";
import TagButton from "../layouts/TagButton";
import DropDownToggle from "../layouts/DropDownToggle";
import Message from "../layouts/Message";
import RightFloatButton from "../layouts/RightFloatButton";
import Search from "../layouts/Search";
import { Redirect } from 'react-router-dom';
import {BrowserHistory} from 'react-router';

class Main extends Component {

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
            return <Message chatName={pData.chatName} nickName={pData.masterNickName} interest={pData.interestName} cost = {pData.maxCost} key={index}/>
        })
        return lData
    })


    handleClick = () => {
        console.log('show popup');
    }

    render() {
        return (
            <div className="p-t-30">
                <Search/>
                <div className="m-t-10">
                    <DropDownToggle dropdownData={"최신순, 인기순"} selectedIndex={0}/>
                    <TagButton value={"동물"} />
                    <TagButton value={"IT"} />
                    <div className="float-right">
                        <LinkButton value={"설정"} dataTarget={"myModal"} />
                    </div>
                </div>

                <div className="message-box contact-box soo-card m-t-10">
                    <div className="message-widget contact-widget">
                        {
                            this.state.chatList ? this._roadingFun() : "Roading...."
                        }
                    </div>
                </div>
                <RightFloatButton iconType={"newChat"}/>
            </div>
        );
    }
}

export default Main;
