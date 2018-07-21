import React, { Component } from 'react';

class TypeIcon2 extends Component {
    state = {
        disabled: false
    }

    getDisabled() {
        return (this.state.disabled) ? "disabled" : "";
    }

    render() {
        return (
            <button type="button"
                    className={"btn-success btn sj-icon m-l-10 " + this.getDisabled()}
                    onClick={(e) => {
                        {
                            this.setState(prevState => ({
                                disabled: !prevState.disabled
                            }));

                            this.props.onClick(this.state.disabled, this.props.text)
                        }
                    }}
            >{this.props.text}</button>
        );
    }
}

export default TypeIcon2;


