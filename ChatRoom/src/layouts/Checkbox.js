import React, { Component } from 'react';

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: props.isChecked || false,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    // state = {
    //     isChecked: false
    // };

    handleChange() {
        this.setState({
            isChecked: !this.state.isChecked
        }, () => {
            this.props.onChange(this.state.isChecked);
        })
    }

    componentDidMount() {
        console.log('didmount');

    }

    render() {
        return (
            <label className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input"
                        onChange={this.handleChange}/>
                       {/*onChange={this.props.handleChange(this.state.isChecked, this.props.text)}/>*/}
                <span className="custom-control-indicator"></span>
                <span className="custom-control-description">{this.props.text}</span>
            </label>
        );
    }
}

export default Checkbox;


