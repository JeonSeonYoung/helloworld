import React, { Component } from 'react';

class ChatName extends Component {
    // props: chatName, changeText(text)
    state = {
        chatName: ""
    }

    onChange(e) {
        // 부모한테도 바뀐 닉네임을 전달해줘야 한다.
        this.props.changeText(e.target.value);
        this.setState({
            chatName: e.target.value
        });
    };

    // componentWillMount() {
    //     if (this.props.name !== "") {
    //         this.setState({
    //             chatName: this.props.name
    //         });
    //     }
    // }

    render() {
        return (
            // props -> name, changeText
            <div className="form-group">
                <label htmlFor="example-location">ChatRoom Name</label>
                <input type="text" className="form-control"
                       placeholder="Enter Chatroom Name"
                       onChange={this.onChange.bind(this)}
                       value={this.state.chatName}
                />
            </div>
        );
    }
}

export default ChatName;