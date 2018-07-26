import React, { Component } from 'react';
import ModalButton from "./ModalButton";
import Location from './Setting/Location';
import AlertModal from "./AlertModal";
import InterestCombo from './Setting/InterestCombo';
import SelectedInterestCombo from './Setting/SelectedInterestCombo';
import cookie from 'react-cookies';

// SideNav 에 있는 채팅방 검색 화면
class SearchFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // jong
            distance : "1",
            // chae
            active: false,
            selectedInterest: [],
            newDistance: "",
            interest : "",
            fbData: ""
        };

        this.getSelectedIcon = this.getSelectedIcon.bind(this);
        this.changeDistance= this.changeDistance.bind(this);
        this.saveSetting = this.saveSetting.bind(this);

        // get facebook info
        var fbData = cookie.load('fbData');
        if( typeof fbData !== 'undefined' && fbData != '' ) {
            // set user info
            this.setUserInfo(fbData.userID);
        }
    }

    componentWillMount() {
        console.log('Main.js, componentWillMount()');

        var fbData = cookie.load('fbData');

        console.log(fbData);

        if (typeof fbData == 'undefined' || fbData == '') {
            this.setState({
                fbData: "",
                page: 'login'
            });
        } else {
            this.setState({
                fbData: fbData,
                page: 'main'
            });
        }
    }

    // set user info
    setUserInfo = (userID) => {

        // get user info
        var command = JSON.stringify({
            method: "query",
            params: {
				ExpressionAttributeValues: {
					":v1": { S: userID }
				}, 
				KeyConditionExpression: "userID = :v1", 
				TableName: "UserInfo",
				IndexName : "userID-createAt-index"       
            }
        });
        
        var userInfo = new Promise((resolve, reject) => {
            fetch('https://6v3nxrnag4.execute-api.ap-northeast-2.amazonaws.com/dev/manageruserinfo', {
                method: 'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: command
            }).then((data) => {
                resolve(data.json());
            });           
        });     
        
        userInfo.then((data) => {
            if( data.result == 'success' ) {
                console.log(data.data.Items[0].distance);
                var userDistance = data.data.Items[0].distance.N;
                //var interest = data.data.Items[0].interest.S;
                if (userDistance === 'undefined' || userDistance == "" || userDistance == "null") {
                    userDistance = '1'
                }
                console.log(data.data.Items[0].distance);
                this.setState({
                    // distance : distance == 'null' || distance == '' ? '1' : distance
                    distance: userDistance
                });


            }
        });
    }      

    // render 다음에 작동
    componentDidMount(){
        this._getdata()
    }

    _getdata = async () => {
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
            body: JSON.stringify({ userID: this.state.fbData.userID })
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

    _loadingSelectedInterestFun = (() =>{

        // return -> interestID, name
        var filtered = this.state.interestdata.filter(item =>
            this.state.settingdata.interest.indexOf(Number(item.interestID)) != -1
        );

        var lData = filtered.map((pData, index) => {
            return <SelectedInterestCombo interest={pData.name} key={index} />
        });

        return lData;
    })

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


    // 필터 데이터 저장
    saveSetting() {
        // 설정데이터 가져오기
        var saveData = {};

        // location
        saveData.location = this.state.newDistance;

        // selected interest
        saveData.selectedInterest = this.state.settingdata.interest;

        console.log(saveData);

        // jong, update user info
        console.log('save button');

        var fbData = cookie.load('fbData');
        if( typeof fbData !== 'undefined' && fbData != '' ) {

            // save distance
            var distance = saveData.location;
            if( typeof distance !== 'undefined' && distance != '' ) {
                this.updateUserInfo(fbData.userID, fbData.createAt, 'distance', distance);
            }

            // save interest
            var interest = saveData.selectedInterest;
            if( typeof interest !== 'undefined' && interest != '' ) {
                this.updateUserInfo(fbData.userID, fbData.createAt, 'interest', JSON.stringify({ id : interest }));
            }

            // set state
            this.setState({
                distance : distance,
                interest : interest
            });
        }
    }

    // '관심분야' 선택하면 id(text) 에 해당하는 icon 을 '선택된 관심분야'에 추가하고,
    // 선택된 걸 다시 클릭했을 땐 '선택된 관심분야'에서 제거한다.

    getSelectedIcon(select, id) {
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
            })
        );

    }

    saveData = () => {
        if( typeof this.state.settingdata !== 'undefined' ) {
            var fbData = cookie.load('fbData');
            if( typeof fbData !== 'undefined' && fbData != '' ) {
                // save interest
                var interest = this.state.settingdata.interest;
                if( typeof interest !== 'undefined' && interest != '' ) {
                    this.updateUserInfo(fbData.userID, fbData.createAt, 'interest', JSON.stringify({ id : JSON.stringify(interest) }));
                }
            }
        }
    }

    deleteIcon = (disabled, id) => {

        // console.log("toggle!" + id);
        this.setState( prevState => ({
            interestData: prevState.interestdata.filter((item) => {
                return item.key !== id
            })
        }));

        // 관심분야도 toggle 줘야 한다.
        // disabled 없애기
        // $("button:contains(" + id + ")").removeClass("disabled");
    }

    addSelectedIcon = (id, doAdd) => {
        console.log(id, doAdd);
        this.setState(prevState => ({
            interestData: prevState.interestdata.push(id)
        }))

        if (doAdd) {


        }
    }

    _getsettingdata = async () => {
        const settingdata = await this._callsettingdataApi();
        const interestdata = await this._callInterestdataApi();

        this.setState({
            settingdata,
            interestdata
        })
    }

    changeDistance(distance) {
        this.setState({
            newDistance: distance
        })
    }

    nothingDo() {
        return null;
    }

    // // 데이터 유효성 검사
    // validateData() {
    //     console.log(this.state.newDistance);
    //     if (this.state.newDistance == ""){
    //         <AlertModal message="위치를 설정해주세요" />
    //         return false;
    //     }
    //
    //     if (this.state.settingdata.interest == ""){
    //         <AlertModal message="관심분야를 설정해주세요" />
    //         return false;
    //     }
    //
    //     return true;
    // }

    updateUserInfo = (userID, createAt, field, value) => {

        var command = JSON.stringify({
            method: "update",
            params: {
                Key: {
                    userID: userID,
                    createAt: createAt
                },
                UpdateExpression: "set #field = :x",
                ExpressionAttributeNames: {
                    "#field": field
                },
                ExpressionAttributeValues: {
                    ":x": value
                },
                TableName: "UserInfo"
            }
        });


        var userInfo = new Promise((resolve, reject) => {
            fetch('https://6v3nxrnag4.execute-api.ap-northeast-2.amazonaws.com/dev/manageruserinfo', {
                method: 'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: command
            }).then((data) => {
                resolve(data.json());
            });
        });

        userInfo.then((data) => {
            //console.log(data);
        });

    }

    _loadingLocationFun = (() =>{
        // return <Location distance={this.state.settingdata.distance} changeDistance={this.changeDistance} />
        return <Location distance={this.state.distance} changeDistance={this.changeDistance} />
    })

    render() {
        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Search Filter</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="example-location">Set Location</label>
                            {
                                this.state.settingdata ? this._loadingLocationFun() : "Loading...."
                            }
                        </div>
                        <div className="form-group">
                            <label>Selected Interests</label>
                            <div className="container">
                                <div className="row">
                                    {
                                        this.state.settingdata ? this._loadingSelectedInterestFun() : "Loading...."
                                        //this.state.interestdata ? this._loadingSelectedInterestFun() : "Loading...."
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
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary btn-block"
                                data-target="#alertModal"
                                data-dismiss="modal" onClick={this.saveSetting}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchFilter;


