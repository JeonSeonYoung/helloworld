import React, { Component } from 'react';

class Checkbox extends Component {
    render() {
        return (
            <label className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input"/>
                <span className="custom-control-indicator"></span>
                <span className="custom-control-description">{this.props.text}</span>
            </label>
        );
    }
}

export default Checkbox;


