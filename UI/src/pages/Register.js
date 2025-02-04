import React, { Component } from 'react';
import ChatLeft from "../layouts/ChatLeft";
import TypeIcon from '../layouts/TypeIcon2';
import NickName from '../layouts/Setting/NickName';
import { Link } from 'react-router-dom';
import InterestCombo from '../layouts/Setting/InterestCombo';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies';

// import { withRouter } from 'react-router-dom';

class Register extends Component {

    constructor(props) {
        super(props);

        // state
        this.state = {
            selectedIcon : "",
            chatList: [],

            // jong, interest info
            interestInfo : "",
            page : "register",
            interestID : "-1",
            fbData : ""
        };        

        var fbData = cookie.load('fbData');

        // undefined error
        if( typeof fbData == 'undefined' || fbData == '' ) {
            this.setState({
                fbData : ""
            });
        }
        else {
            this.setState({
                fbData : fbData
            });
        }


        
        this.getSelectedIcon = this.getSelectedIcon.bind(this);    
    }

    getDate = () => {
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();

        return yyyy + "-" + mm + "-" + dd;
    }

    getInterest = () => {

       var command = JSON.stringify({
            method: "scan",
            params: {
                TableName: "InterestInfo"    
            }
        });
    
        var interestInfo = new Promise((resolve, reject) => {
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
    
        interestInfo.then((data) => {
            if( data.result == 'success' ) {
                this.setState({
                    interestInfo : data.data.Items
                });
            }
        });        
    }

    scanUserInfo = () => {

        var command = JSON.stringify({
            method: "scan",
            params: {            
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
            if( data.result == 'success' ) {
                var count = data.data.Count;
                this.updateSequenceControlForUserInfo(count)
            }

        });        
    }

    updateSequenceControlForUserInfo = (count) => {

        var command = JSON.stringify({
            method: "update",
            params: {
                Key: {
                    tableCode: "UserInfo"       
                },
                UpdateExpression: "set #field = :x",
                ExpressionAttributeNames: {
                    "#field": "tableSequence"
                },
                ExpressionAttributeValues: {
                    ":x": count
                },                
				TableName: "SequenceControl" 
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

    updateUserInfo = (userID, createAt, field, value) => {
        console.log('Register.js, updateUserInfo()');
        

        var command = JSON.stringify({
            method: "update",
            params: {
                Key: {
                    userID: userID,
                    createAt: createAt           
                },
                UpdateExpression: "set #field = :x",
                ExpressionAttributeNames: {
                    "#field": field
                },
                ExpressionAttributeValues: {
                    ":x": value
                },                
				TableName: "UserInfo" 
            }
        });        

        console.log(command);
        
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
            console.log('Register.js, Reuslt');
            console.log(data);
        });

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
                this.registerDefaultUserInfo();
            }
        });
    }

    // register default
    registerDefaultUserInfo = () => {

        // get facebook info
        var fbData = cookie.load('fbData');

        // undefined error
        if( typeof fbData == 'undefined' || fbData == '' ) {
            return;
        }
        
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
                        S: JSON.stringify({id:[]})
                    },
                    distance: {
                        S: '-1'
                    },
                    email: {
                        S: fbData.email
                    },
                    facebookToken: {
                        S: 'null'
                    },                    
                    interest: {
                        S: JSON.stringify({id:[this.state.interestID]})
                    },
                    nickName: {
                        S: 'guest'
                    },
                    updateAt: {
                        S: this.getDate()
                    },
                    vLocation: {
                        S: "{\"lat\":\"0\",\"lng\":\"0\"}"
                    },
                    lastLoginAt: {
                        S: this.getDate()
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
        console.log('Register.js, getSelectedIcon()');
        console.log('interestID : ' + id);

        // get facebook info
        var fbData = this.props.location.state.params;        

        this.setState({
            interestID : id
        });
        
        var list = []
            .concat(<ChatLeft name="Admin" key={id} message={"You choose " + id + ". If you want more, please you setting page."} />)
            /*
            .concat(<ChatLeft name="Admin" key={id+1} message="Where is your location?" />)
            .concat(<ChatLeft name="Admin" key={id+2} message="What is your nickname?" />)
            .concat(<div><input type="text" key={id+3} className="form-control" /></div>)
            */
        ;

        this.setState({
            selectedIcon: id,
            chatList: list
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

    _loadingInterestFun = (() =>{
        
        var lData = this.state.interestdata.map((pData, index) => {
            /*
            return <InterestCombo interestID={pData.interestID}
                                  interest={pData.name}
                                  getSelectedIcon={this.getSelectedIcon}
                                  key={index}
            />
            */

            return <TypeIcon text={pData.name} getSelectedIcon={this.getSelectedIcon} interestID={index}
                             key={index}
            />
        })
        return lData
    }) 
    
    saveButton = () => {
        console.log('Register.js, saveButton');
        console.log('interestID : ' + this.state.interestID);

        // get facebook info
        var fbData = cookie.load('fbData');

        // undefined error
        if( typeof fbData == 'undefined' || fbData == '' ) {
            return;
        }        

        console.log('userID : ' + fbData.userID);
        console.log('createAt : ' + fbData.createAt);

        var interestID = this.state.interestID;

        if( interestID != -1 ) {


            // first, register default user info
            this.registerUserInfo();

            // scan & update sequene control
            this.scanUserInfo();  


            /*
            // set interest id
            this.updateUserInfo(fbData.userID, fbData.createAt, "interest", JSON.stringify({
                id : [interestID]
            }));           
            */

            // go to main
            this.setState({
                page : 'main'
            });
        } 
        else {
            // go to register
            this.setState({
                page : 'register'
            });
        }
    }

    // render 다음에 작동
    componentDidMount(){
        this._getdata()
    }

    _getdata = async () => {
        const interestdata = await this._callInterestdataApi();
        this.setState({
            interestdata
        })
    }    

    render() {
        var fbData = this.props.location.state.params;
        var message = "Hello " + fbData.name + ", please select one your preference.";

        if( this.state.page == 'register') {
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
                                </div>
                                <div className="chat-rbox">
                                    <ul className="chat-list p-20">
                                        <ChatLeft
                                            name="Admin"
                                            message={message}
                                        />
                                        <li className="reverse">
                                            {/* Chat Content */}
                                            <div className="chat-content">
                                                <div className="form-group">
                                                    <label>Interests</label>
                                                    <div className="container">
                                                        <div className="row">
                                                            {
                                                                this.state.interestdata ? this._loadingInterestFun() : "Loading...."
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        {this.state.chatList.map(item => {
                                            return item;
                                        })}
                                        <button className="btn btn-success btn-block" onClick={this.saveButton}>
                                            <span className="hide-menu">Save</span>
                                        </button>
                                        {this.props.children}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if( this.state.page == 'main') {
            return(
                <div>
                    <Redirect to='/' />
                </div>
            );
        }
    }
}

export default Register;

