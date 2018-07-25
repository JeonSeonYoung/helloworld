import React, { Component } from 'react';
import MapContainer from '../layouts/MapContainer';
import cookie from 'react-cookies';

class Map extends Component
{
    constructor(props) {
        super(props)

        // if exist, get user info
        var fbData = cookie.load('fbData');
        console.log(fbData);
        if( typeof fbData !== 'undefined' && fbData != '' ) {
            this.setUserInfo(fbData.userID);

            this.state = {
                userID: fbData.userID,
                createAt: fbData.createAt,
                vLocation: fbData.vLocation
            };
        }
        else 
        {
            this.state = {

            }
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

                // set vLocation
                var userID = data.data.Items[0].userID.S;
                var createAt = data.data.Items[0].createAt.N;
                var vLocation = JSON.stringify(data.data.Items[0].vLocation.S);

                console.log(userID + "," + createAt + "," + vLocation)

                this.setState({
                    userID : userID == 'null' || userID == '' ? '' : userID,
                    createAt : createAt == 'null' || createAt == '' ? '' : createAt,
                    vLocation: vLocation == 'null' || vLocation == '' ? '' : vLocation
                });    
                
                this.forceUpdate();
            }
        });
    }    

    render(){
        return(
            <div>
                <MapContainer id={this.props.id} userID={this.state.userID} createAt={this.state.createAt} vLocation={this.state.vLocation} />
            </div>
        );
    }
}

export default Map;
