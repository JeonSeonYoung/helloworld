import React, { Component } from 'react';

class Loading extends Component {
    render() {

        return (
            <section id="wrapper">
                <div className="login-register">
                    <div className="login-box">
                        <div className="card-body text-center db">
                            <img src="./assets/images/intro3.png" className="sj-logo" />
                            <form className="form-horizontal form-material mt-3" id="loginform" action="index.html">
                                <h3 className="box-title m-b-20 ">HelloWorld</h3>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Loading;