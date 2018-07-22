
import React, { Component } from 'react';
import TypeIcon from '../TypeIcon2';

class InterestCombo extends Component {

    state = {
        
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <TypeIcon text={this.props.interest} Click={this.getSelectedIcon} />
                </div>
            </div>
        );
    }
}

export default InterestCombo;