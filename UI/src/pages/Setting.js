import React, { Component } from 'react';
import NickName from '../layouts/Setting/NickName';
import Save from '../layouts/Setting/Save';
import Location from '../layouts/Setting/Location';
import InterestCombo from '../layouts/Setting/InterestCombo';
import comm from "../resources/utils/CommonVariables";

class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            distance: "1km",
            selectedInterest: []
        };
    }

    state = {
  
    }

    // render 다음에 작동
    componentDidMount(){
        //this._getSettingData()
    }

    /*
    _getSettingData = async () => {
        const SettingData = await this._callSettingApi();
        this.setState({
            SettingData
        })
    }

    _callSettingDataApi = () => {
        return fetch('https://funk0a9a03.execute-api.ap-northeast-2.amazonaws.com/dev/getSettingData', {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({ userID: '1' })
        }).then(lData => lData.json())
            .catch(error => console.log(error))
    }

                            <NickName nickName={this.props.nickName} />
                                <InterestCombo settingData={this.props.SettingData} />
    */

    // 설정 데이터 저장
    saveSetting() {
        // 설정데이터 가져오기
        // var datas = this.state;

        // 관심분야
        var interests = this.state.preference.map( (interest) => {
            return comm.getInterestId(interest);
        })
    }

    render() {
        return (
            <div className="p-t-30">
                <h4 className="modal-title">설정</h4>
                <NickName name="NickName" />
                <Location />
                <div className="form-group">
                    <label>Selected Interests</label>
                    {this.state.selectedInterest}
                </div>
                <div className="form-group">
                    <label>Interests</label>
                    <InterestCombo />
                </div>
                <Save saveSetting={this.saveSetting} />
            </div>
        );
    }
}

export default Setting;