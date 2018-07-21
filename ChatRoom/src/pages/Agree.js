import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div>
                <h4>이용약관</h4>
                <div data-spy="scroll" data-target="#navbar-example2" data-offset="0">
                    <p>...</p>
                </div>
                <h4>개인정보취급방</h4>
                <div data-spy="scroll" data-target="#navbar-example2" data-offset="0">
                    <h4 id="fat">@fat</h4>
                    <p>...</p>
                    <h4 id="mdo">@mdo</h4>
                    <p>...</p>
                    <h4 id="one">one</h4>
                    <p>...</p>
                    <h4 id="two">two</h4>
                    <p>...</p>
                    <h4 id="three">three</h4>
                    <p>...</p>
                </div>
                <button type="button" className="btn btn-success btn-block">모두 동의</button>
                <span>약관 동의는 이용에 필수입니다.</span>
            </div>

        );
    }
}

export default Login;