import React, { Component } from 'react';

class NickName extends Component {
    state = {
        nickName: ""
    }

    onChange(e) {
        // 부모한테도 바뀐 닉네임을 전달해줘야 한다.
        this.props.changeText(e.target.value);
        this.setState({
            nickName: e.target.value
        });
    };

    componentWillMount() {
        if (this.props.name !== "") {
            this.setState({
                nickName: this.props.name
            });
        }
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor="example-location">NickName</label>
                <input type="text" className="form-control"
                       placeholder="Enter Nick Name"
                       onChange={this.onChange.bind(this)}
                       value={this.state.nickName}
                />
            </div>
        );
    }
}

export default NickName;