import React, { Component } from 'react';
import TypeIcon from '../TypeIcon2';

/**
 * @key 배열 요소의 키값
 * @interest 관심분야 텍스트
 **/
class SelectedInterestCombo extends Component {

    render() {
        return (
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                <button type="button"
                        className={"btn-success btn sj-icon m-l-10 mb-2 disabled"}
                >{this.props.interest}</button>
            </div>
        );
    }
}

export default SelectedInterestCombo;