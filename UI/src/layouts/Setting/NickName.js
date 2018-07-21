import React, { Component } from 'react';

class NickName extends Component {
    render() {
        return (
            <div className="form-group">
                <label>NickName</label>
                <input type="text" className="form-control" placeholder="Enter Task Name" />
            </div>
        );
    }
}

export default NickName;