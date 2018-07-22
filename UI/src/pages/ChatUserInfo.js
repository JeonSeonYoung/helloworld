import React, { Component } from 'react';
import NickName from '../layouts/Setting/NickName';
import Save from '../layouts/Setting/Save';
import Location from '../layouts/Setting/Location';
import InterestCombo from '../layouts/Setting/InterestCombo';
import comm from "../resources/utils/CommonVariables";

class ChatUserInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    state = {
  
    }

    _loadingInterestFun = (() =>{
        var lData = this.state.interestdata.map((pData, index) => {
            return <InterestCombo interest={pData.name} key={index} />
        })
        return lData
    })

    render() {
        return (
            <div className="p-t-30">
                <h4 className="modal-title">Chat User</h4>
            </div>
        );
    }
}

export default ChatUserInfo;