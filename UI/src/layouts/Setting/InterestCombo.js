
import React, { Component } from 'react';
import TypeIcon from '../TypeIcon2';

class InterestCombo extends Component {

    state = {
        
    }
    render() {
        return (
            <TypeIcon text={this.props.interest} Click={this.getSelectedIcon} />
        );
    }
}

export default InterestCombo;