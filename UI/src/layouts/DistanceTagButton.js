import React, { Component } from 'react';

class DistanceTagButton extends Component {

    constructor(...args) {
        super(...args);
        this.onClickButton = this.onClickButton.bind(this);
    }

    onClickButton() {
        console.log(this.props.distance);
        this.props.onDistanceRemove(this.props.distance);
    } 
    
    render() {
        return (
            <button type="button" className="btn waves-effect waves-light btn-info mb-1 mr-1" onClick={this.onClickButton}>
                {"# " + this.props.name}
                <i className="mdi mdi-close" ></i>
            </button>
            
        );
    }
}

export default DistanceTagButton;


