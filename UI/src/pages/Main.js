import React, { Component } from 'react';
import TagButton from "../layouts/TagButton";
import DistanceTagButton from "../layouts/DistanceTagButton";
import Message from "../layouts/Message";
import Search from "../layouts/Search";
import Modal from '../pages/Modal';
import TextNotify from '../layouts/TextNotify';
import AlertModal from "../layouts/AlertModal";
// import DropDownToggle from "../layouts/DropDownToggle";
// import LinkButton from "../layouts/LinkButton";
// import RightFloatButton from "../layouts/RightFloatButton";

class Main extends Component {

    state = {
        "distance" : "-1",
        "currentPage" : "1"
    }

    // render 다음에 작동
    componentDidMount(){
        this._getChatLists()
    }

    _getChatLists = async (lData) =>{
    const chatList = await this._callChatListApi(lData);
    const interestList = await this._callInterestApi();
        this.setState({
            chatList,
            "interestData": interestList.interestData,
            "distance" : interestList.distance,
            "currentPage": this.state.currentPage
        })
    }

    //채팅방 리스트
    _callChatListApi = (lData) => {
    var lParams = {
        userID : "2",
        // currentPage : "1"
        currentPage : this.state.currentPage
    }
    if(lData){
        lParams["chatName"] = lData.name;
    }
    return fetch('https://funk0a9a03.execute-api.ap-northeast-2.amazonaws.com/dev/getsearchchatroom', {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify(lParams)        
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
        body: JSON.stringify({userID : '2'})
    }).then(lData => lData.json())
    .catch(error => console.log(error))
    }

    _loadingFun = (() => {
        // 채팅방 없을 때 표시 해주기
        if (this.state.chatList.length == 0) {
            return <TextNotify text="채팅방이 존재하지 않습니다." />;
        }

        var lData = this.state.chatList.map((pData, index) =>{
            return <Message chatName={pData.chatName} nickName={pData.masterNickName}
                            interest={pData.interestName} cost = {pData.maxCost} key={index}/>
        })

        return lData
    })

    _loadingInterestFun = (() =>{
        var lData = this.state.interestData.map((pData) =>{
            return <TagButton name={pData.name} interestID={pData.interestID}
                              distance={pData.distance} key={pData.interestID}
                              onRemove = {this.handleRemove}/>
        })
        return lData
    })

    //관심분야 삭제
    _callDelInterestApi = (lData) => {
        console.log("api 호출")
        return fetch('https://funk0a9a03.execute-api.ap-northeast-2.amazonaws.com/dev/deleteinterest', {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({userID : '2', interestID : lData})
        }).then(lData => lData.json())
        .catch(error => console.log(error))
    }

    //거리 삭제
    _callDelInterestApi = (lData) => {
        console.log("api 호출")
        return fetch('https://funk0a9a03.execute-api.ap-northeast-2.amazonaws.com/dev/deletedistance', {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({userID : '2', distance : "-1"})
        }).then(lData => lData.json())
        .catch(error => console.log(error))
    }

    handleClick = () => {
        console.log('show popup');
    }

    handleCreate = (lData) => {
        this._getChatLists(lData); 
    }

    // interest handle
    handleRemove = async (lData) => {
        console.log(lData);
        const delInterestData = await this._callDelInterestApi(lData);
        const chatList = await this._callChatListApi();
        const interestList = await this._callInterestApi();
        this.setState({
            chatList,
            "interestData": interestList.interestData,
            "distance" : interestList.distance
        })
    }

    //distance handle
    handleDistanceRemove = async (lData) => {
        console.log(lData);
        if(lData !== -1){
            const delInterestData = await this._callDelInterestApi();
            const chatList = await this._callChatListApi();
            const interestList = await this._callInterestApi();
            this.setState({
                chatList,
                "interestData": interestList.interestData,
                "distance" : interestList.distance
            });
        }        
    }

    render() {
        return (
            <div className="p-t-30">
                {/* 검색 + 상세검색 */}
                <Search onCreate = {this.handleCreate}/>
                <div className="m-t-10">
                    {/* 태그 */}
                    {
                        this.state.interestData ? this._loadingInterestFun() : ""
                    }
                    {
                        this.state.distance !== "-1" ?
                            <DistanceTagButton name={this.state.distance +"km"}
                                       distance={this.state.distance}
                                       key={this.state.distance} onDistanceRemove = {this.handleDistanceRemove}/>
                         : <DistanceTagButton name="no limit"
                                      distance="-1"
                                      key="-1"/>
                    }
                </div>
                {/*채팅방 리스트*/}
                <div className="message-box contact-box m-t-10">
                    <div className="message-widget contact-widget">
                        {
                            this.state.chatList ? this._loadingFun() : "Loading...."
                        }
                    </div>
                </div>
                {/*오른쪽 밑에 붙어있는 버튼*/}
                <button type="button"
                        className="btn-success btn btn-circle btn-xl pull-right m-l-10 sj-float-right"
                        data-toggle="modal"
                        data-target="#createChat">
                    <i className="mdi mdi-note-outline text-white"></i>
                </button>
                <Modal id="createChat"/>
            </div>
        );
    }
}

export default Main;
