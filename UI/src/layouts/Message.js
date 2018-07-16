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
                            <h5>강아지 데리고 같이 놀아요!</h5> <span className="mail-desc">David chicken</span>
                            <span className="badge badge-info">반려동물</span>
                            <span className="badge badge-warning">제한없음</span>
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


