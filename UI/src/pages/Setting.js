import React, { Component } from 'react';
import NickName from '../layouts/Setting/NickName';
import Save from '../layouts/Setting/Save';
import Location from '../layouts/Setting/Location';
import InterestCombo from '../layouts/Setting/InterestCombo';

class Setting extends Component {

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

    render() {
        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Setting</h4>
                    </div>
                    <div className="modal-body">
                        <form>
                            <NickName />
                            <Location />
                            <div className="form-group">
                                <label>Interests</label>
                                <InterestCombo />
                            </div>
                        </form>
                    </div>
                    <Save />
                </div>
            </div>
        );
    }
}

export default Setting;