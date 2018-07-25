import React, { Component } from 'react';

/**
 * @name 관심분야 이름
 * @interestID 관심분야 아이디
 * @distance 거리
 * @key 관심분야 아이디
 * @onRemove()
 */
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
            <span className="badge badge-info" onClick={() => this.onClickButton} >
                {"# " + this.props.name}<i className="mdi mdi-close" ></i>
            </span>
        );
    }
}

export default TagButton;


