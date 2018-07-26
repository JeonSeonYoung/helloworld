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

        this.FB = props.fb;

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

    // 로그인 처리
    // 권한 없을 때?
    responseFacebook = (response) => {
        console.log('Login.js, responseFacebook');
        console.log(response);

        var fbData = {
            name : response.name,
            email : response.email,
            accessToken : response.accessToken,
            userID : response.userID,
            createAt : "",
            nickName : "guest"
        }

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

            if( data.result == 'success' ) {
                if( data.data.Count == 0 ) {

                    console.log('Login.js, go to register');

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

                    console.log('Login.js, go to main');

                    // set create date for update
                    fbData.createAt = data.data.Items[0].createAt.S;
    
                    // save cookies for facebook data
                    cookie.save('fbData', fbData, cookieOptions);
                
                    // set state                
                    this.setState({
                        status : "main",
                        params : fbData
                    });

                    // 로그인 후 마지막 접속기록
                    this.updateUserInfo(fbData.userID, fbData.createAt, "lastLoginAt", this.getDate());                       
                }
            }         
        });
    }    

    getDate = () => {
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();

        return yyyy + "-" + mm + "-" + dd;
    }    

    updateUserInfo = (userID, createAt, field, value) => {

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

    render() {
        console.log(this.state.status);
        window.FB.getLoginStatus(response => {
            //console.log(response);
        });

        if( this.state.status == 'logout' ) {
            // remove cookies
            cookie.remove('fbData', { path: '/' });    

            console.log('Login.js, logout');

            window.FB.getLoginStatus(response => {
                console.log(response);
    
                if( response.status === 'connected' ) {
                    window.FB.logout();
                }
            });     
            
            this.setState({
                status : 'login'
            });

            
            return(
                <div>
                    <Redirect to='/login' />
                </div>
            );
        }

        if( this.state.status == 'login' ) {                    
            return(

                    <section id="wrapper">
                        <div className="login-register">
                            <div className="login-box">
                                <div className="card-body text-center db">
                                    <img src="./assets/images/intro3.png" className="sj-logo" />
                                    <form className="form-horizontal form-material mt-3" id="loginform" action="index.html">
                                        <h3 className="box-title m-b-20">HelloWorld</h3>
                                        <div className="form-group text-center m-t-20">
                                            <div className="col-xs-12">
                                                <FacebookLogin
                                                    appId="474958262956536"
                                                    autoLoad={false}
                                                    fields="name,email,picture"
                                                    callback={this.responseFacebook}
                                                />
                                                {/*<button*/}
                                                    {/*className="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light"*/}
                                                    {/*type="submit">Log In with Facebook*/}
                                                {/*</button>*/}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="preloader">
                            <svg className="circular" viewBox="25 25 50 50">
                                <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2"
                                        strokeMiterlimit="10"/>
                            </svg>
                        </div>
                    </section>
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