import React, { Component } from 'react';

class Save extends Component {
    render() {
        return (
            <div className="sj-overflow">
                <button type="button" className="btn btn-success pull-right"
                    onClick={this.saveSetting}>Save</button>
            </div>
        );
    }
}

export default Save;