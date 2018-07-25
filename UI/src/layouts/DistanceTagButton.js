import React, { Component } from 'react';

/**
 * @name 거리 + km
 * @distance 거리
 * @key 거리
 * @onDistanceRemove() 거리
 */
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
            <span className="badge badge-info" onClick={() => this.onClickButton} >
                {"# " + this.props.name}<i className="mdi mdi-close" ></i>
            </span>
        );
    }
}

export default DistanceTagButton;


