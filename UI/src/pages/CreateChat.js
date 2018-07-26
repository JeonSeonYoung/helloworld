import React, { Component } from 'react';
import AlertModal from "../layouts/AlertModal";
import ChatName from '../layouts/ChatName';
import Map from './Map';
import Checkbox from '../layouts/Checkbox';
import InterestCombo from '../layouts/Setting/InterestCombo';
import cookie from 'react-cookies';

class CreateChat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            interestdata: [],           // 관심분야
            newChatName: "",
            newvLocation: "",
            selectedInterest: -1,       // 선택된 관심분야 id
            selectedInterestName: "",   // 선택된 관심분야 텍스
            disabled: "",
            disabledClass: "",
            fbData: ""
        };

        var fbData = cookie.load('fbData');
        if(typeof fbData == 'undefined' || fbData == "" ) {
            console.log('fbData == undefined');
        }
        console.log(fbData);

        this.changeText = this.changeText.bind(this);
        this.createChat = this.createChat.bind(this);
        this.getSelectedIcon = this.getSelectedIcon.bind(this);
    }

    // 여기는 db 에서 가져올 데이터가 없으므로
    // render 다음에 작동
    componentDidMount(){
        this._getdata()
    }

    // 관심분야 가져오기
    _getdata = async () => {
        const interestdata = await this._callInterestdataApi();
        this.setState({
            interestdata
        })
    }

    _callInterestdataApi = () => {
        return fetch('https://funk0a9a03.execute-api.ap-northeast-2.amazonaws.com/dev/getallinterest', {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(lData => lData.json())
            .catch(error => console.log(error))
    }

    // CreateChat
    _callCreateChatApi = (fbData, savedData) => {
        console.log("api 호출")
        return fetch('https://funk0a9a03.execute-api.ap-northeast-2.amazonaws.com/dev/createchatroom', {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({
                userID : fbData.userID, 
                chatName:  savedData.chatName,
                interestID: fbData.interestID,
                masterNickName: fbData.nickName,
                maxCost: "10",
                vLocation: fbData.vLocation
            })
        }).then(lData => lData.json())
        .catch(error => console.log(error))
    }

    getSelectedIcon(id, name) {
        this.setState({
            selectedInterest: id,
            selectedInterestName: name
            // disabledClass: "disabled"
        })
    }

    createChat = async () => {

        // 데이터 유효성 검사 보류. (modal 안에 modal 띄우는 거 해결해야함)
        // this.validateData();

        var fbData = cookie.load('fbData');
        if(typeof fbData == 'undefined' || fbData == "" ) {
            console.log('fbData == undefined');
        }
        console.log(fbData);

        var saveData = {};

        // chatroom name
        saveData.chatName = this.state.newChatName;
        if (saveData.chatName == "" || saveData.chatName === 'undefined')
        {
            alert("채팅방 이름을 입력하세요 !!!.");
            return;
        }

        var vLocation = cookie.load('vLocation');
        if (typeof vLocation == 'undefined' || vLocation == "")
        {
            console.log("vLocation == undefined");
        }
        console.log(vLocation);

        // vlocation
        saveData.vlocation = vLocation;

        // selected interest
        saveData.selectedInterest = this.state.selectedInterest;

        const saveChat = await this._callCreateChatApi(fbData, saveData);

        console.log(fbData.userID)
        console.log(saveData.chatName)
        console.log(saveData.selectedInterest)
        console.log(fbData.nickName)
        console.log("10")
        console.log(fbData.vLocation)
        console.log(saveData);
        console.log(saveChat);
        // 저장 작업 쿼리 호출

        window.location.href = "/";
    }

    // 데이터 유효성 검사
    validateData() {
        if (this.state.selectedInterest == -1){
            this.setState({
                message: "위치를 설정해주세요"
            })
            return false;
        }

        if (this.state.settingdata.interest == ""){
            <AlertModal message="관심분야를 설정해주세요" />
            return false;
        }
        return true;
    }

    changeText (text) {
        this.setState({
            newChatName: text
        })
    }

    _ChatNameFun = (() => {
        return <ChatName chatName={this.state.chatName}
                         changeText={this.changeText} />
    })

    // 아이콘 선택하면 disabled 클래스 추가
    // getDisabled() {
    //     return (this.state.disabled) ? "disabled" : "";
    // }

    // 관심분야 (채팅방 개설할 땐 '하나'만 선택할 수 있다.)
    _loadingInterestFun = (() =>{

        {/*여기선 관심분야를 하나만 선택하는거라 따로 코딩했음*/}
        var lData = this.state.interestdata.map((pData, index) => {
            // pData = interestID, name

            return (
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 " key={index}>
                    <button type="button"
                            className={"btn-success btn sj-icon m-l-10 mb-2 " + this.state.disabledClass}
                            onClick={() => {this.getSelectedIcon(pData.interestID, pData.name)}}
                    >{pData.name}</button>
                </div>
            )
        })

        return lData;
    })

    render() {
        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Create ChatRoom</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                {
                                    this._ChatNameFun()
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="example-location">Select Location</label>
                                <div className="sj-map">
                                    <Map id="create_chat" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Interests</label>
                                <span className="ml-3">{this.state.selectedInterestName}</span>
                                <div className="container">
                                    <div className="row">
                                        {
                                            this.state.interestdata ? this._loadingInterestFun() : "Loading...."
                                        }
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary btn-block"
                                data-target="#alertModal"
                                data-dismiss="modal" onClick={this.createChat}>Create ChatRoom</button>
                        {/*modal 안에 modal 띄우는 작업 보류*/}
                        {/*<button type="button" className="btn btn-primary btn-block" data-toggle="modal"*/}
                                {/*href="#stack1">Create ChatRoom*/}
                        {/*</button>*/}

                        {/*<div id="stack1" className="modal hide fade" tabIndex="-1" role="dialog">*/}
                            {/*<div className="modal-dialog" role="document">*/}
                                {/*<div className="modal-content">*/}
                                    {/*<div className="modal-footer">*/}
                                        {/*<button type="button" className="btn btn-secondary" data-dismiss="modal">Okay</button>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateChat;
