import React, { Component } from 'react';

class Footer extends Component {
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
                            // this.props.onClick(this.props.text, !this.state.disabled);
                            //this.props.getSelectedIcon(this.props.text, !this.state.disabled)
                            this.setState(prevState => ({
                                disabled: !prevState.disabled
                            }));

                        }
                    }}
            >{this.props.text}</button>
        );
    }
}

export default Footer;


