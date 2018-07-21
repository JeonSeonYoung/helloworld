import React, { Component } from 'react';
import LinkButton from "../layouts/LinkButton";
import TagButton from "../layouts/TagButton";
import DropDownToggle from "../layouts/DropDownToggle";
import Message from "../layouts/Message";
import RightFloatButton from "../layouts/RightFloatButton";
import Search from "../layouts/Search";
import Modal from '../pages/Modal';

class Main extends Component {

    state = {
        "distance" : "-1"
    }

    // render 다음에 작동
    componentDidMount(){
        this._getChatLists()
    }

    _getChatLists = async () =>{
    const chatList = await this._callChatListApi();
    const interestList = await this._callInterestApi();
        this.setState({
            chatList,
            "interestData": interestList.interestData,
            "distance" : interestList.distance
        })
    }


    //채팅방 리스트
    _callChatListApi = () => {
    return fetch('https://funk0a9a03.execute-api.ap-northeast-2.amazonaws.com/dev/getsearchchatroom', {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({userID : '1'})
    }).then(lData => lData.json())
    .catch(error => console.log(error))
    }

    //관심분야
    _callInterestApi = () => {
    return fetch('https://funk0a9a03.execute-api.ap-northeast-2.amazonaws.com/dev/getinterest', {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({userID : '1'})
    }).then(lData => lData.json())
    .catch(error => console.log(error))
    }

    _loadingFun = (() =>{
        var lData = this.state.chatList.map((pData, index) =>{
            return <Message chatName={pData.chatName} nickName={pData.masterNickName} interest={pData.interestName} cost = {pData.maxCost} key={index}/>
        })
        return lData
    })


    _loadingInterestFun = (() =>{
        var lData = this.state.interestData.map((pData) =>{
            return <TagButton name={pData.name} distance={pData.distance} key={pData.interestID}/>
        })
        return lData
    })


    handleClick = () => {
        console.log('show popup');
    }

    handleCreate = (lData) => {
        console.log(lData);
    }

    render() {
        return (
            <div className="p-t-30">
                <Search onCreate = {this.handleCreate}/>
                <div className="m-t-10">
                    <DropDownToggle dropdownData={"최신순, 인기순"} selectedIndex={0}/>
                    {
                        this.state.interestData ? this._loadingInterestFun() : ""
                    }
                    <button type="button" className="btn waves-effect waves-light btn-info ml-1">
                        {this.state.distance !== "-1" ? this.state.distance +"km" : "제한없음"}
                        <i className="mdi mdi-close"></i>
                    </button>
                    {/*상세검색*/}
                    <div className="float-right">
                        <button className="waves-effect waves-light btn-info ml-1 btn" data-toggle="modal"
                                data-target="#searchFilter">검색설정</button>
                        <Modal id="searchFilter"/>
                        {/*<LinkButton value={"설정"} dataTarget={"setting"} designType={"button"} />*/}
                    </div>
                </div>

                <div className="message-box contact-box soo-card m-t-10">
                    <div className="message-widget contact-widget">
                        {
                            this.state.chatList ? this._loadingFun() : "Loading...."
                        }
                    </div>
                </div>
                <button type="button"
                        className="waves-effect waves-light btn-success btn btn-circle btn-xl pull-right m-l-10"
                        data-toggle="modal"
                        data-target="#createChat"
                        ><i className="mdi mdi-note-outline text-white"></i></button>
                {/*<RightFloatButton iconType={"newChat"}/>*/}
                <Modal id="createChat"/>
            </div>
        );
    }
}

export default Main;
