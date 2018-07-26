import React, { Component } from 'react';
import TagButton from "../layouts/TagButton";
import DistanceTagButton from "../layouts/DistanceTagButton";
import Message from "../layouts/Message";
import Search from "../layouts/Search";
import Modal from '../pages/Modal';
import TextNotify from '../layouts/TextNotify';
import AlertModal from "../layouts/AlertModal";
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';

// import DropDownToggle from "../layouts/DropDownToggle";
// import LinkButton from "../layouts/LinkButton";
// import RightFloatButton from "../layouts/RightFloatButton";

class Main extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        distance : "-1",
        currentPage : "1",
        fbData : "",
        page : "main"
    } 
        /*
        this._callInterestApi = this._callInterestApi.bind(this);

        window.FB.getAccessToken(response => {
            console.log(response);
        });

        */

    componentWillMount() {
        //console.log('Main.js, componentWillMount()');

        var fbData = cookie.load('fbData');
        
        console.log(fbData);

        if( typeof fbData == 'undefined' || fbData == '' ) {
            this.setState({
                fbData : "",
                page : 'login'
            });
        } else {
            this.setState({
                fbData : fbData,
                page : 'main'
            });
        }
    }

    componentDidMount() {
        console.log('Main.js, componentDidMount()');
        console.log('userID : ' + this.state.fbData.userID);


        this._getChatLists()

        window.onscroll = function(ev) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                alert("you're at the bottom of the page");
            }
        };

    }

    _getChatLists = async (lData) =>{
        console.log('Main.js, _getChatLists()');
        console.log('userID : ' + this.state.fbData.userID);

        const chatList = await this._callChatListApi(lData);
        const interestList = await this._callInterestApi();
        console.log(interestList);
        this.setState({
            chatList,
            "interestData": interestList.interestData,
            "distance" : interestList.distance,
            "currentPage": chatList[0].currentPage
            //"currentPage": this.state.currentPage
        })
    }

    //채팅방 리스트
    _callChatListApi = (lData) => {

        console.log('Main.js, _callChatListApi()');
        console.log('userID : ' + this.state.fbData.userID);    
        console.log('lData', lData);
        console.log(lData);    

        var userID = this.state.fbData.userID;

        var lParams = {
            userID : userID,
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

        console.log('Main.js, _callInterestApi()');
        console.log('userID : ' + this.state.fbData.userID);        

        var userID = this.state.fbData.userID;

        return fetch('https://funk0a9a03.execute-api.ap-northeast-2.amazonaws.com/dev/getinterest', {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({userID : userID})
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
        var lData = this.state.interestData.map((pData, index) =>{
            return <TagButton name={pData.name} interestID={pData.interestID}
                              distance={pData.distance} key={pData.interestID}
                              onRemove = {this.handleRemove}/>
        })
        return lData
    })

    //관심분야 삭제
    _callDelInterestApi = (lData) => {

        console.log('Main.js, _callInterestApi()');
        console.log('userID : ' + this.state.fbData.userID);        

        var userID = this.state.fbData.userID;
                
        return fetch('https://funk0a9a03.execute-api.ap-northeast-2.amazonaws.com/dev/deleteinterest', {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({userID : userID, interestID : lData})
        }).then(lData => lData.json())
        .catch(error => console.log(error))
    }

    //거리 삭제
    _callDelInterestApi = (lData) => {
        
        console.log('Main.js, _callDelInterestApi()');
        console.log('userID : ' + this.state.fbData.userID);        

        var userID = this.state.fbData.userID;        

        return fetch('https://funk0a9a03.execute-api.ap-northeast-2.amazonaws.com/dev/deletedistance', {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({userID : userID, distance : "-1"})
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
        console.log('Main.js, render()');

        if( this.state.page == 'main' ) {
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
                            className="btn-success btn btn-circle btn-xl pull-right m-l-10 sj-float-right sj-position-fixed"
                            data-toggle="modal"
                            data-target="#createChat">
                        <i className="mdi mdi-note-outline text-white"></i>
                    </button>
                    <Modal id="createChat"/>
                </div>
            );
        } 

        if( this.state.page == 'login' ) {
            return(
                <div>
                    <Redirect to='/login' />
                </div>
            );
        }
    }
}

export default Main;