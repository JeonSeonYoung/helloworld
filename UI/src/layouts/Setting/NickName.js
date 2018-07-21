import React, { Component } from 'react';

class NickName extends Component {
    render() {
        return (
            <div className="form-group">
                <label>{this.props.name}</label>
                <input type="text" className="form-control" placeholder="Enter Nick Name" />
            </div>
        );
    }
}

export default NickName;