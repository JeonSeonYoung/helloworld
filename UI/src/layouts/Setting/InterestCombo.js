
import React, { Component } from 'react';
import TypeIcon from '../TypeIcon2';

class InterestCombo extends Component {

    state = {
        
    }
    render() {
        return (
            <TypeIcon text={this.props.interest}
                      interestID={this.props.interestID}
                      getSelectedIcon={this.props.getSelectedIcon}
                      isSelected={this.props.isSelected}
            />
        );
    }
}

export default InterestCombo;