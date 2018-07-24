import React, { Component } from 'react';

class TagButton extends Component {

    constructor(...args) {
        super(...args);
        this.onClickButton = this.onClickButton.bind(this);
    }

    onClickButton() {
        this.props.onRemove(this.props.interestID);
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

export default TagButton;


