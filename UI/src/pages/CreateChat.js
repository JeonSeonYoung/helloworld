import React, { Component } from 'react';
import Checkbox from '../layouts/Checkbox';
import Map from './Map';
import InterestCombo from '../layouts/Setting/InterestCombo';

class CreateChat extends Component {

    state = {
  
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

    _loadingInterestFun = (() =>{
        var lData = this.state.interestdata.map((pData, index) => {
            return <InterestCombo interest={pData.name} key={index} />
        })
        return lData
    })

    createChat(){
        // lat , lng
        // ChatName
        // interestID

    }

    render() {
        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Create ChatRoom</h4>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="example-location">ChatRoom Name</label>
                                <input type="text" className="form-control" placeholder="Enter Task Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="example-location">Select Location</label>
                                <div className="sj-map">
                                    <Map id="create_chat"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="example-location">Interests</label>
                                <div className="form-check">
                                    {
                                        this.state.interestdata ? this._loadingInterestFun() : "Loading...."
                                    }
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-success btn-block" data-dismiss="modal" onClick={this.createChat}>Create ChatRoom</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateChat;
