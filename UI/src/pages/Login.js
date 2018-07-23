import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';

import cookie from 'react-cookies';

// 쿠키 설정
let expires = new Date();
let tmp = expires.getDate();
expires.setDate(tmp + 1); // One Day

const cookieOptions = {
    path: '/',
    expires
}

class Login extends Component {

    constructor(props) {
        super(props);

        var fbData = cookie.load('fbData');

        // undefined error
        if( typeof fbData === 'undefined' || fbData == '' ) {
            this.state = {
                status : "login"
            }
        } else {
            this.state = {
                status : "logout"
            }
        }

        // console.log(this.props.location.state.login);
    }

    getDate = () => {
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();

        return yyyy + "-" + mm + "-" + dd;
    }    

    responseFacebook = (response) => {

        console.log(response);

        var fbData = {
            name : response.name,
            email : response.email,
            accessToken : response.accessToken,
            userID : response.userID,
            createAt : ""
        }

        // 로그인 후 갱신
        // this.forceUpdate();

        // 조회
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

            //console.log(data);
            //console.log(data.result);
            //console.log(data.data.Count);

            if( data.result == 'success' && data.data.Count == 0 ) {
                // set create date for update
                fbData.createAt = this.getDate();

                // save cookies for facebook data
                cookie.save('fbData', fbData, cookieOptions);                
            
                // set state
                this.setState({
                    status : "register",
                    params : fbData
                });
            }
            else {
                // set create date for update
                fbData.createAt = data.data.Items[0].createAt.S;
                console.log(fbData);

                // save cookies for facebook data
                cookie.save('fbData', fbData, cookieOptions);
            
                // set state                
                this.setState({
                    status : "main",
                    params : fbData
                });
            }


        });
    }    

    render() {

        if( this.state.status == 'logout' ) {
            // remove cookies
            cookie.remove('fbData', { path: '/' });    

            // render
            return(
                <div>
                    <Redirect to='/' />
                </div>
            );

            
        }

        if( this.state.status == 'login' ) {
            return(
                <div id='login' className="modal-dialog" role="document">

                    <div className="modal-content">

                        {/* Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">FACEBOOK LOGIN</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>

                        {/* Body */}
                        <div className="modal-body">
                            <form>
                                <div>
                                    <FacebookLogin
                                        appId="474958262956536"
                                        autoLoad={false}
                                        fields="name,email,picture"
                                        callback={this.responseFacebook}
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Bottom */}
                        <div className="modal-footer">
                            {/*
                                <button type="button" className="btn btn-success" data-dismiss="modal">저장</button>
                            */}
                        </div>
                    </div>
                </div>
            );
        }   
        
        if( this.state.status == 'register' ) {
            return(
                <div>
                    <Redirect to={{
                        pathname: '/register',                                    
                        state: { params: this.state.params }
                    }} />
                </div>
            );
        }   
        
        if( this.state.status == 'main' ) {
            return(
                <div>
                    <Redirect to='/' />
                </div>
            );
        }           
    }
}

export default Login;