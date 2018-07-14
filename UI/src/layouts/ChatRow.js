import React, { Component } from 'react';

class ChatRow extends Component {
    render() {
        return (
            <ul>
                <li>
                    <div className="chat-img"><img src="../assets/images/users/2.jpg" alt="user" /></div>
                    <div className="chat-content">
                        <h5>Bianca Doe</h5>
                        <div className="box bg-light-success">It’s Great opportunity to work.</div>
                        <div className="sj-chat-time">10:55 am</div>
                    </div>
                </li>
                <li className="reverse">
                    <div className="chat-content">
                        <h5>Bianca Doe</h5>
                        <div className="box bg-light-success">It’s Great opportunity to work.</div>
                        <div className="sj-chat-time">10:55 am</div>
                    </div>
                    <div className="chat-img"><img src="../assets/images/users/2.jpg" alt="user" />
                    </div>

                </li>
                <li>
                    <div className="chat-img"><img src="../assets/images/users/2.jpg" alt="user" /></div>
                    <div className="chat-content">
                        <h5>Bianca Doe</h5>
                        <div className="box bg-light-success">It’s Great opportunity to work.</div>
                        <div className="sj-chat-time">10:55 am</div>
                    </div>
                </li>
                <li className="reverse">
                    <div className="chat-content">
                        <h5>Bianca Doe</h5>
                        <div className="box bg-light-success">It’s Great opportunity to work.</div>
                        <div className="sj-chat-time">10:55 am</div>
                    </div>
                    <div className="chat-img"><img src="../assets/images/users/2.jpg" alt="user" /></div>

                </li>
            </ul>
    );
    }
}


export default ChatRow;


