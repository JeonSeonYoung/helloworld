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

        var name = cookie.load('name');

        // undefined error
        if( typeof name === 'undefined' || name == '' ) {
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

    responseFacebook = (response) => {

        console.log(response);

        var fbData = {
            name : response.name,
            email : response.email,
            accessToken : response.accessToken,
            userID : response.userID
        }

        // 쿠키 저장
        cookie.save('name', response.name, cookieOptions);
        cookie.save('email', response.email, cookieOptions);
        cookie.save('picture', response.picture.data.url, cookieOptions);        

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
                this.setState({
                    status : "register",
                    params : fbData
                });
            }
            else {
                this.setState({
                    status : "main"
                });
            }
        });
    }    

    render() {

        if( this.state.status == 'logout' ) {
            // remove cookies
            cookie.remove('name', { path: '/' });
            cookie.remove('email', { path: '/' });
            cookie.remove('picture', { path: '/' });            

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

        /*
            // undefined error
            if( typeof cookie.load('name') === 'undefined' ) {
                cookie.remove('name', { path: '/' });
                cookie.remove('email', { path: '/' });
                cookie.remove('picture', { path: '/' });
            }

            // check cookies
            if( !cookie.load('name') ) {
                return (
                    <div>
                        {loginView}
                    </div>
                );
            } else {
                return (
                    <div>
                        <Redirect to = "/" />
                    </div>
                );
            }
        */
    }
    
}

export default Login;