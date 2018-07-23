import React, { Component } from 'react';
import ChatLeft from "../layouts/ChatLeft";
import TypeIcon from '../layouts/TypeIcon2';
import { Link } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';

class Register extends Component {


    constructor(props) {
        super(props);

        // state
        this.state = {
            selectedIcon : "",
            chatList: []
        };

        this.getSelectedIcon = this.getSelectedIcon.bind(this);

        // first, register default user info
        this.registerUserInfo();
    }

    getDate = () => {
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();

        return yyyy + "-" + mm + "-" + dd;
    }

    registerUserInfo = () => {

        // get facebook info
        var fbData = this.props.location.state.params;        

        var command = JSON.stringify({
            method: "query",
            params: {
				ExpressionAttributeValues: {
					":v1": { S: fbData.userID }
				}, 
				KeyConditionExpression: "userID = :v1", 
				TableName: "UserInfo",
				IndexName : "userID-createAt-index"       
            }
        });
        
        var userInfo = new Promise((resolve, reject) => {
            fetch('https://6v3nxrnag4.execute-api.ap-northeast-2.amazonaws.com/dev/manageruserinfo', {
                method: 'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: command
            }).then((data) => {
                resolve(data.json());
            });           
        });     
        
        userInfo.then((data) => {
            if( data.result == 'success' && data.data.Count == 0 ) {
                this.registerUserInfo();
            }
        });
    }

    // register default
    registerDefaultUserInfo = () => {

        // get facebook info
        var fbData = this.props.location.state.params;
        
        // temp
        var command = JSON.stringify({
            method: "put",
            params: {
                Item: {
                    userID: {
                        S: fbData.userID
                    },
                    createAt: {
                        S: this.getDate()
                    },
                    blockTf: {
                        S: 'T'
                    },
                    chatList: {
                        S: 'null'
                    },
                    distance: {
                        S: 'null'
                    },
                    email: {
                        S: fbData.email
                    },
                    facebookToken: {
                        S: fbData.accessToken
                    },                    
                    interest: {
                        S: 'null'
                    },
                    nickName: {
                        S: 'null'
                    },
                    updateAt: {
                        S: this.getDate()
                    },
                    vLocation: {
                        S: 'null'
                    }

                },
				TableName: "UserInfo" 
            }
        });        

        
        var userInfo = new Promise((resolve, reject) => {
            fetch('https://6v3nxrnag4.execute-api.ap-northeast-2.amazonaws.com/dev/manageruserinfo', {
                method: 'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: command
            }).then((data) => {
                resolve(data.json());
            });           
        });     
        
        userInfo.then((data) => {
            console.log(data);
        });     
         
    }

    // 선택한 아이콘 정보 가져오기
    getSelectedIcon(disabled, id) {

        var list = []
            .concat(<ChatLeft name="Admin" key={id} message={"You choose " + id + ". If you want more, please you setting page."} />)
            .concat(<ChatLeft name="Admin" key={id+1} message="Where is your location?" />)
            //지도띄우기
            .concat(<ChatLeft name="Admin" key={id+2} message="What is your nickname?" />)
            .concat(<div><input type="text" key={id+3} className="form-control" /></div>)
        ;

        this.setState({
            selectedIcon: id,
            chatList: list
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="card m-b-0">
                        <div className="chat-main-box">
                            <div className="chat-right-aside">
                                <div className="chat-main-header">
                                    <div className="p-20 b-b">
                                        <h3 className="box-title">Register basic options</h3>
                                    </div>
                                </div>
                                <div className="chat-rbox">
                                    <div className="slimScrollDiv">
                                        <ul className="chat-list p-20">
                                            <ChatLeft name="Admin"
                                                       message="Hello {username}, please select one your preference."
                                            />
                                            <li className="reverse">
                                                <div className="chat-content">
                                                    <div className="form-group">
                                                        <label>관심분야</label>
                                                        <div className="container">
                                                            <div className="row mb-2">
                                                                <TypeIcon text="반려동물" onClick={this.getSelectedIcon} />
                                                                <TypeIcon text="문화/공연" onClick={this.getSelectedIcon} />
                                                                <TypeIcon text="봉사"  onClick={this.getSelectedIcon}/>
                                                                <TypeIcon text="운동/스포츠" onClick={this.getSelectedIcon} />
                                                            </div>
                                                            <div className="row mb-2">
                                                                <TypeIcon text="책/글" onClick={this.getSelectedIcon} />
                                                                <TypeIcon text="직무" onClick={this.getSelectedIcon} />
                                                                <TypeIcon text="외국어"  onClick={this.getSelectedIcon}/>
                                                                <TypeIcon text="음악/악기" onClick={this.getSelectedIcon} />
                                                            </div>
                                                            <div className="row mb-2">
                                                                <TypeIcon text="댄스/무용" onClick={this.getSelectedIcon} />
                                                                <TypeIcon text="사교/인맥" onClick={this.getSelectedIcon} />
                                                                <TypeIcon text="사진" onClick={this.getSelectedIcon} />
                                                                <TypeIcon text="야구관람" onClick={this.getSelectedIcon} />
                                                            </div>
                                                            <div className="row mb-2">
                                                                <TypeIcon text="게임/오락" onClick={this.getSelectedIcon} />
                                                                <TypeIcon text="요리/제조" onClick={this.getSelectedIcon} />
                                                                <TypeIcon text="가족/결혼" onClick={this.getSelectedIcon} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            {this.state.chatList.map(item => {
                                                return item;
                                            })}
                                            <Link to="/" className="btn btn-success btn-block">
                                                <span className="hide-menu">저장</span>
                                            </Link>
                                            {this.props.children}
                                        </ul>
                                        <div className="slimScrollBar"></div>
                                        <div className="slimScrollRail"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        );
    }
}

export default Register;

