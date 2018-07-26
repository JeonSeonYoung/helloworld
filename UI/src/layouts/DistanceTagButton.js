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

        this.state = {
            className: ""
        }

        this.onClickButton = this.onClickButton.bind(this);
    }

    componentDidMount() {

        if (this.props.distance != -1) {
            this.setState({
                className: "mdi mdi-close"
            })
        }
    }

    onClickButton() {
        this.props.onDistanceRemove(this.props.distance);
    }

    render() {
        return (
            <span className="badge badge-info sj-cursor-pointer" onClick={this.onClickButton} >
                {"# " + this.props.name}<i className={this.state.className}></i>
            </span>
        );
    }
}

export default DistanceTagButton;


