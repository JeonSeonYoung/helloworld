import React, { Component } from 'react';

class ChatUserInfo extends Component {

    render() {
        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Chat User Info</h4>
                    </div>
                    <div className="modal-body">
                        <label htmlFor="example-location">{this.props.userInfo.userName}</label>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning btn-block"
                                data-dismiss="modal">강퇴하기</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatUserInfo;