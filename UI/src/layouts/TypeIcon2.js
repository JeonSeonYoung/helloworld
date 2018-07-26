import React, { Component } from 'react';

/**
 * @text 관심분야 텍스트
 * @interestID 관심분야 키값
 * @getSelectedIcon(isSelected, interestID) 선택된 아이콘
 * @isSelected 선택유무
 */
class TypeIcon2 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            disabled: this.props.isSelected
        }

        //this.selectIcon = this.selectIcon.bind(this);
    }

    // 아이콘 선택하면 disabled 클래스 추가
    getDisabled() {
        return (this.state.disabled) ? "disabled" : "";
    }

    //
    // selectIcon(id) {
    //     this.props.getSelectedIcon(id);
    // }

    render() {
        return (
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <button type="button"
                        className={"btn-success btn sj-icon m-l-10 mb-2 " + this.getDisabled()}
                        onClick={() => {
                            {
                                if( typeof this.props.getSelectedIcon !== 'undefined' ) {
                                    this.props.getSelectedIcon(!this.state.disabled, this.props.interestID)
                                    this.setState(prevState => ({
                                        disabled: !prevState.disabled
                                    }));
                                }
                            }
                        }}
                >{this.props.text}</button>
            </div>
        );
    }
}

export default TypeIcon2;


