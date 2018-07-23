import React, { Component } from 'react';
import NickName from '../layouts/Setting/NickName';
import Location from '../layouts/Setting/Location';
import InterestCombo from '../layouts/Setting/InterestCombo';
import comm from "../resources/utils/CommonVariables";

class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
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

    _callsettingupdateApi = () => {
        return fetch('https://funk0a9a03.execute-api.ap-northeast-2.amazonaws.com/dev/putsettingupdate', {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: {
                "nickName": "nick",
                "interest": "{\"id\":[1,4,6]}"
                
            }
        }).then(lData => lData.json())
            .catch(error => console.log(error))
    }

    _loadingNickNameFun = (() =>{
        return <NickName name={this.state.settingdata.nickName} />
    })

    _loadingLocationFun = (() =>{
        return <Location distance={this.state.settingdata.distance} />
    })

    _loadingSelectedInterestFun = (() =>{
        var lData = this.state.settingdata.interest.map((pData, index) => {
            this.state.interestdata.map((inData, index) => {
                if (pData == inData.interestID){
                    console.log(pData + " " + inData.interestID + " " + inData.name)
                    return <InterestCombo interest={inData.name} key={index} />
                }
            })
        })
        return lData
    })

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
        //var interests = this.state.preference.map( (interest) => {
        //    return comm.getInterestId(interest);
        //})

        this._callsettingupdateApi();
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
                    <div className="container">
                        <div className="row">
                            {
                                this.state.settingdata ? this._loadingSelectedInterestFun() : "Loading...."
                            }
                        </div>
                    </div>
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
                <div className="sj-overflow">
                    <button type="button" className="btn btn-success pull-right" onClick={this.saveSetting}>Save</button>
                </div>
            </div>
        );
    }
}

export default Setting;