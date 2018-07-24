
import React, { Component } from 'react';
import TypeIcon from '../TypeIcon2';

/**
 * @key 배열 요소의 키값
 * @interestID 관심분야 키값
 * @interest 관심분야 텍스트
 * @getSelectedIcon 선택된 아이콘
 * @isSelected 선택유무
 **/
class InterestCombo extends Component {
    state = {
        
    }
    render() {
        return (
            <TypeIcon text={this.props.interest}
                      interestID={this.props.interestID}
                      getSelectedIcon={this.props.getSelectedIcon}
                      isSelected={this.props.isSelected}
            />
        );
    }
}

export default InterestCombo;