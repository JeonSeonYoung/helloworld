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
            
        };
    }

    state = {
  
    }

    // render 다음에 작동
    componentDidMount(){
        this._getsettingdata()
    }

    _getsettingdata = async () => {
        const settingdata = await this._callsettingdataApi();
        const interestdata = await this._callInterestdataApi();
        this.setState({
            settingdata,
            interestdata
        })
    }

    _callsettingdataApi = () => {
        return fetch('https://funk0a9a03.execute-api.ap-northeast-2.amazonaws.com/dev/getsettingdata', {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({ userID: '1' })
        }).then(lData => lData.json())
            .catch(error => console.log(error))
    }

    _callInterestdataApi = () => {
        return fetch('https://funk0a9a03.execute-api.ap-northeast-2.amazonaws.com/dev/getallinterest', {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(lData => lData.json())
            .catch(error => console.log(error))
    }

    _loadingNickNameFun = (() =>{
        var lData = this.state.settingdata.map((pData, index) =>{
            return <NickName name={pData.nickName} key={index}/>
        })
        return lData
    })

    _loadingLocationFun = (() =>{
        var lData = this.state.settingdata.map((pData, index) =>{
            return <Location distance={pData.distance} key={index}/>
        })
        return lData
    })
    /*
    _loadingSelectedInterestFun = (() =>{
        var lData = this.state.settingdata.map((pData, index) => {

            return <InterestCombo  />
        })
        return lData
    })
    */

    _loadingInterestFun = (() =>{
        var lData = this.state.interestdata.map((pData, index) => {
            return <InterestCombo interest={pData.name} key={index} />
        })
        return lData
    })

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
                <h4 className="modal-title">Setting</h4>
                {
                    this.state.settingdata ? this._loadingNickNameFun() : "Loading...."
                }
                {
                    this.state.settingdata ? this._loadingLocationFun() : "Loading...."
                }
                <div className="form-group">
                    <label>Selected Interests</label>
                    {this.state.selectedInterest}
                </div>
                <div className="form-group">
                    <label>Interests</label>
                    <div className="container">
                        <div className="row">
                        {
                            this.state.interestdata ? this._loadingInterestFun() : "Loading...."
                        }
                        </div>
                    </div>
                </div>
                <Save saveSetting={this.saveSetting} />
            </div>
        );
    }
}

export default Setting;