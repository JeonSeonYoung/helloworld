import React, { Component } from 'react';

class NickName extends Component {
    render() {
        return (
            <div className="form-group">
                <label htmlFor="example-location">NickName</label>
                <input type="text" className="form-control" placeholder="Enter Nick Name" value={this.props.name}/>
            </div>
        );
    }
}

export default NickName;