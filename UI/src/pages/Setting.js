import React, { Component } from 'react';
import NickName from '../layouts/Setting/NickName';
import Location from '../layouts/Setting/Location';
import InterestCombo from '../layouts/Setting/InterestCombo';

class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newNickName: "",
            newDistance: ""
        };

        this.getSelectedIcon = this.getSelectedIcon.bind(this);
        this.saveSetting = this.saveSetting.bind(this);
        this.changeText = this.changeText.bind(this);
        this.changeDistance= this.changeDistance.bind(this);
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

    changeText(text) {
        this.setState({
            newNickName: text
        })
    }

    changeDistance(distance) {
        this.setState({
            newDistance: distance
        })
    }

    _loadingNickNameFun = (() =>{
        return <NickName name={this.state.settingdata.nickName}
                         changeText={this.changeText}
        />
    })

    _loadingLocationFun = (() =>{
        return <Location distance={this.state.settingdata.distance}
                         changeDistance={this.changeDistance}
        />
    })


    _loadingSelectedInterestFun = (() =>{

        console.log('interest:' + this.state.settingdata.interest);
        // return -> interestID, name
        var filtered = this.state.interestdata.filter(item =>
            this.state.settingdata.interest.indexOf(Number(item.interestID)) != -1
        );

        var lData = filtered.map((pData, index) => {
           return  <InterestCombo interest={pData.name} key={index} />
        });

        return lData;
    })

    getSelectedIcon(select, id) {
        console.log('getSelectedIcon ' + select, id);

        // select false 면 selectedIcon 에서 제외해준다.
        if (!select) {

            var idx = this.state.settingdata.interest.indexOf(Number(id));

            if (idx > -1) {
                var selectedInterest = this.state.settingdata.interest;
                selectedInterest.splice(idx, 1);

                this.setState(prevState => ({
                    ...prevState,
                    settingdata: {
                        ...prevState.settingdata,
                        interest: this.state.settingdata.interest.filter((interest) => {
                            return selectedInterest.indexOf(Number(interest)) != -1
                        })
                    }
                }))
            }
            return;
        }

        this.setState(prevState => ({
            ...prevState,
            settingdata: {
                ...prevState.settingdata,
                interest: this.state.settingdata.interest.concat(Number(id))
            }
        }));
    }
    _loadingInterestFun = (() =>{
        // selected 되어있는 것만 disabled 해주기
        var lData = this.state.interestdata.map((pData, index) => {

            var isSelected;
            isSelected = this.state.settingdata.interest.indexOf(Number(pData.interestID)) != -1 ?
                true : false;

            return <InterestCombo interestID={pData.interestID}
                                  interest={pData.name}
                                  isSelected={isSelected}
                                  getSelectedIcon={this.getSelectedIcon}
                                  key={index}
            />
        })
        return lData
    })

    // 설정 데이터 저장
    saveSetting() {
        // 설정데이터 가져오기
        var saveData = {};

        // nickname
        saveData.nickName = this.state.newNickName;

        // location
        saveData.location = this.state.newDistance;

        // selected interest
        saveData.selectedInterest = this.state.settingdata.interest;

        console.log(saveData);

        // this._callsettingupdateApi();
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
                    <button type="button" className="btn btn-success pull-right"
                            onClick={this.saveSetting}>Save</button>
                </div>
            </div>
        );
    }
}

export default Setting;