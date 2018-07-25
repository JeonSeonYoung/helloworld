import React from 'react';
import { compose, withStateHandlers } from "recompose";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import Main from '../pages/Main';
import MapPage from '../pages/Map'
import cookie from 'react-cookies';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';

const cancelLocation = () => {
    return <Main />
}

// 쿠키 설정
let expires = new Date();
let tmp = expires.getDate();
expires.setDate(tmp + 1); // One Day

const cookieOptions = {
    path: '/',
    expires
}

    var updateUserInfo = (userID, createAt, field, value) => {

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
        console.log(data);
    });

}

const Map = compose(
    withStateHandlers(() => ({
        isMarkerShown: false,
        markerPosition: null
    }), {

            // update location data
            _callMapupdateApi: () => {
                var fbData = cookie.load('fbData');
                if( typeof fbData !== 'undefined' && fbData != '' ) {    

                    var vLocation = cookie.load('vLocation');
                    if( typeof vLocation !== 'undefined' && vLocation != '' ) { 

                        console.log(vLocation);
                        updateUserInfo(fbData.userID, fbData.createAt, 'vLocation', vLocation);                         
                    }                   
                }       
                
                ReactDOM.render(
                    <MapPage page='main' />,
                    document.getElementById('map')
                );
            },
    
            // click 
            onMapClick: ({ isMarkerShown }) => (e) => {
                console.log(JSON.parse(JSON.stringify(e.latLng)).lat)
                console.log(JSON.parse(JSON.stringify(e.latLng)).lng)

                console.log(e.latLng);


                var location = {
                    lat : String(JSON.parse(JSON.stringify(e.latLng)).lat),
                    lng : String(JSON.parse(JSON.stringify(e.latLng)).lng)
                };

                cookie.save('vLocation', location, cookieOptions);

                return {
                    markerPosition: e.latLng,
                    isMarkerShown: true
                }
            }
        }),
    withScriptjs,
    withGoogleMap
)
    (props =>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: 37.532600 , lng: 127.024612 }}
            onClick={props.onMapClick}
        >
            {props.isMarkerShown && <Marker position={props.markerPosition} />}
            {props.isMarkerShown &&
             props.id != "create_chat" &&
                <div style={{ background: `white`, border: `1px solid #ccc`, padding: 15 }}>
                    <h1>Are you sure with this location ?</h1>
                    <button onClick={props._callMapupdateApi} style={{ width: 70, height: 60 }}>
                        OK
                    </button>
                    <button onClick={() => cancelLocation()} style={{ width: 70, height: 60 }}>
                        Cancel
                    </button>
                </div>
            }
        </GoogleMap>
    )

export default class MapContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <Map
                    id = {this.props.id}
                    userID = {this.props.userID}
                    createAt = {this.props.createAt}
                    vLocation = {this.props.vLocation}
                    mapUpdate = {this._callMapupdateApi}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )

    }
}
