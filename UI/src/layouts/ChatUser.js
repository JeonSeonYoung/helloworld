import React, { Component } from 'react';

class ChatUser extends Component {
    render() {
        return (
            <li>
                <a href="javascript:void(0)">
                    <img src="../assets/images/users/1.jpg" alt="user-img" className="img-circle" />
                    <span>Varun Dhavan <small className="text-success">online</small></span>
                </a>
            </li>
        );
    }
}

export default ChatUser;


