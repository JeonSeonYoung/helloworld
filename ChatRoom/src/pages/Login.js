import React, { Component } from 'react';
import { Route, Router, Redirect } from 'react-router-dom';

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

const responseFacebook = (response) => {

    // 쿠키 저장
    cookie.save('name', response.name, cookieOptions);
    cookie.save('email', response.email, cookieOptions);
    cookie.save('picture', response.picture.data.url, cookieOptions);

    // 로그인 출력
    ReactDOM.render(
        <Login
            name = {response.name}
            email = {response.email}
            picture = {response.picture.data.url}
        />,
        document.getElementById('login')
    );
}

class Login extends Component {

    render() {

        // 로그인 뷰
        const loginView = (
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
                                    autoLoad
                                    fields="name,email,picture"
                                    callback={responseFacebook}
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

        // 로그인 메시지
        const loginMessage = (
            <div id='login' className="modal-dialog" role="document">

                <div className="modal-content">

                    {/* Header */}
                    <div className="modal-header">
                        <h4 className="modal-title">FACEBOOK LOGIN TEST PAGE</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="modal-body">
                        <form>
                            <div>
                                <img src= {cookie.load('picture')} />
                            </div>

                            <div>
                                {cookie.load('name')}
                            </div>

                            <div>
                                {cookie.load('email')}
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

        // undefined error
        if( cookie.load('name') == 'undefined' ) {
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
                    {loginMessage}
                </div>
            );
        }
    }
    
}

export default Login;