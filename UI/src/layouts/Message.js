import React, { Component } from 'react';
import CircleIcon from "../layouts/CircleIcon";

class Message extends Component {
    goPage() {
        console.log('click go');
    }

    render() {
        return (
            <a href="./f8-roominfo.html">
                <div className="row">
                    <div className="col-md-5 col-8 align-self-center">
                        <div className="user-img">
                            <CircleIcon/>
                            {/*<img src="../assets/images/users/1.jpg" alt="user" className="img-circle"/>*/}
                            <span className="profile-status offline pull-right"></span>
                        </div>
                        <div className="mail-contnet">
                            <h5>{this.props.chatName}</h5> <span className="mail-desc">{this.props.nickName}</span>
                            <span className="badge badge-info">{this.props.interest}</span>
                            <span className="badge badge-warning">{this.props.cost}</span>
                        </div>
                    </div>
                    <div className="col-md-7 col-4 align-self-center d-flex m-t-10 justify-content-end">
                        <button type="button" className="btn waves-effect waves-light btn-lg btn-primary"
                                onClick={this.goPage}>Join</button>
                    </div>
                </div>
            </a>
        );
    }
}

export default Message;


