import React, { Component } from 'react';
import Checkbox from '../layouts/Checkbox';
import Map from './Map';
import InterestCombo from '../layouts/Setting/InterestCombo';
import ChatName from '../layouts/ChatName';

class CreateChat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            interestdata: [],           // 관심분야
            newChatName: "",
            newDistance: "",
            selectedInterest: -1,       // 선택된 관심분야 id
            selectedInterestName: "",   // 선택된 관심분야 텍스
            disabled: "",
            disabledClass: ""
        };

        this.changeText = this.changeText.bind(this);
        this.createChat = this.createChat.bind(this);
        this.getSelectedIcon = this.getSelectedIcon.bind(this);
    }

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

    getSelectedIcon(id, name) {
        this.setState({
            selectedInterest: id,
            selectedInterestName: name
            // disabledClass: "disabled"
        })
    }


    createChat(){
        var saveData = {};

        // chatroom name
        saveData.chatName = this.state.newChatName;

        // location
        saveData.location = this.state.newDistance;

        // selected interest
        saveData.selectedInterest = this.state.selectedInterest;

        console.log(saveData);
        // 저장 작업 쿼리 호출
    }

    changeText(text) {
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

        // var lData = this.state.interestdata.map((pData, index) => {
        //     return <InterestCombo interestID={pData.interestID}
        //                           interest={pData.name}
        //                           isSelected={false}
        //                           getSelectedIcon={this.getSelectedIcon}
        //                           key={index}/>
        // })
        return lData
    })

    render() {
        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Create ChatRoom</h4>
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
                                    {/*<Map id="create_chat"/>*/}
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
                                data-dismiss="modal" onClick={this.createChat}>Create ChatRoom</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateChat;
