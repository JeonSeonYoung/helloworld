import React, { Component } from 'react';

class Footer extends Component {
    state = {
        disabled: false
    }

    getDisabled() {
        return (this.state.disabled) ? "disabled" : "";
    }

    // getText = (id) => {
    //     switch(id) {
    //         case "0":
    //             return "반려동물";
    //         case "1":
    //             return "문화/공연";
    //         case "2":
    //             return "봉사";
    //         case "3":
    //             return "운동/스포츠";
    //         case "4":
    //             return "책/글";
    //         case "5":
    //             return "직무";
    //         case "6":
    //             return "외국어";
    //         case "7":
    //             return "음악/악기";
    //         case "8":
    //             return "댄스/무용";
    //         case "9":
    //             return "사교/인맥";
    //         case "10":
    //             return "사진";
    //         case "11":
    //             return "야구관람";
    //         case "12":
    //             return "게임/오락";
    //         case "13":
    //             return "요리/제조";
    //         case "14":
    //             return "가족/결혼";
    //     }
    // }

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


